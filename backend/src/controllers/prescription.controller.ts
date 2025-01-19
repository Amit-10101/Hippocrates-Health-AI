import { Request, Response } from 'express';
import Prescription from '../models/prescription.model';
import User, { IUser } from '../models/user.model';
import { sendErrorResponse, sendSuccessResponse } from '../utils/response';
import { uploadToIPFS } from '../utils/ipfs';
import { mintNFT } from '../utils/nft';
import { generatePrescriptionPDF } from '../utils/pdf';

export const createPrescription = async (req: Request, res: Response) => {
	try {
		const doctorId = req.user?._id;
		const { patientId, details } = req.body;

		const patient = await User.findById(patientId);
		if (!patient) {
			sendErrorResponse(res, 404, 'Patient not found');
			return;
		}

		if (patient.role !== 'Patient') {
			sendErrorResponse(res, 401, 'Invalid request');
			return;
		}

		if (!patient.ethereumAddress) {
			sendErrorResponse(res, 400, 'Patient does not have an Ethereum address');
			return;
		}

		const metadata = {
			doctorId,
			patientId,
			details,
			date: new Date().toISOString(),
		};

		const metadataUri = await uploadToIPFS(metadata);

		const { tokenId: nftId, transactionHash } = await mintNFT({
			recipient: patient.ethereumAddress,
			tokenURI: metadataUri,
		});

		const newPrescription = await Prescription.create({
			doctorId,
			patientId,
			details,
			metadataUri,
			nftId,
			transactionHash,
		});

		sendSuccessResponse(res, 201, 'Prescription created and NFT minted successfully', {
			prescription: newPrescription,
		});
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const getPrescription = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;
		const prescription = await Prescription.findById(id);

		if (!prescription) {
			sendErrorResponse(res, 404, 'Prescription not found');
			return;
		}

		if (
			prescription?.patientId.toString() !== userId?.toString() &&
			prescription?.doctorId.toString() !== userId?.toString()
		) {
			sendErrorResponse(res, 403, 'Access Denied');
			return;
		}

		sendSuccessResponse(res, 200, 'Prescription fetch successful', prescription);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const updatePrescription = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doctorId = req.user?._id;
		const { patientId, details } = req.body;

		const patient = await User.findById(patientId);
		if (!patient) {
			sendErrorResponse(res, 404, 'Patient not found');
			return;
		}

		if (patient.role !== 'Patient') {
			sendErrorResponse(res, 401, 'Invalid request');
			return;
		}

		if (!patient.ethereumAddress) {
			sendErrorResponse(res, 400, 'Patient does not have an Ethereum address');
			return;
		}

		const metadata = {
			doctorId,
			patientId,
			details,
			date: new Date().toISOString(),
		};

		const metadataUri = await uploadToIPFS(metadata);

		const { tokenId: nftId, transactionHash } = await mintNFT({
			recipient: patient.ethereumAddress,
			tokenURI: metadataUri,
		});

		const updatedPrescription = await Prescription.updateOne(
			{ _id: id },
			{
				doctorId,
				patientId,
				details,
				metadataUri,
				nftId,
				transactionHash,
			}
		);

		sendSuccessResponse(res, 201, 'Prescription updated and NFT minted successfully', {
			prescription: updatedPrescription,
		});
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const searchPrescriptions = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		const userRole = req.user?.role;
		const { startDate, endDate, details } = req.query;

		let query: any = {};
		if (userRole === 'Doctor') {
			query.doctorId = userId;
		} else if (userRole === 'Patient') {
			query.patientId = userId;
		} else {
			sendErrorResponse(res, 403, 'Access Denied');
			return;
		}

		if (startDate) {
			query.date = { $gte: new Date(startDate as string) };
		}
		if (endDate) {
			query.date = query.date || {};
			query.date.$lte = new Date(endDate as string);
		}
		if (details) {
			query.details = { $regex: details as string, $options: 'i' };
		}

		const prescriptions = await Prescription.find(query);

		if (prescriptions.length === 0) {
			sendErrorResponse(res, 404, 'No prescription found');
			return;
		}

		sendSuccessResponse(res, 200, 'Prescriptions fetched successfully', prescriptions);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const downloadPrescriptionPDF = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;
		const prescription = await Prescription.findById(id)
			.populate('doctorId')
			.populate('patientId');

		if (!prescription) {
			sendErrorResponse(res, 404, 'Prescription not found');
			return;
		}

		const doctor = prescription.doctorId as IUser;
		const patient = prescription.patientId as IUser;

		if (
			patient._id?.toString() !== userId?.toString() &&
			doctor._id?.toString() !== userId?.toString()
		) {
			sendErrorResponse(res, 403, 'Access Denied');
			return;
		}

		const filePath = await generatePrescriptionPDF(prescription);
		res.download(filePath);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};
