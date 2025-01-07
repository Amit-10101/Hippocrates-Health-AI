import { Request, Response } from 'express';
import Prescription from '../models/prescription.model';
import User from '../models/user.model';
import { sendErrorResponse } from '../utils/response';

export const createPrescription = async (req: Request, res: Response) => {
	try {
		const doctorId = req.user?._id;
		const { patientId, details, metadataUri } = req.body;

		const patient = await User.findById(patientId);
		if (!patient) {
			sendErrorResponse(res, 404, 'Patient not found');
			return;
		}

		if (patient.role !== 'Patient') {
			sendErrorResponse(res, 401, 'Invalid request');
			return;
		}

		const newPrescription = await Prescription.create({
			doctorId,
			patientId,
			details,
			metadataUri,
		});

		res.status(201).json({
			message: 'Prescription generated successfully',
			prescription: newPrescription,
		});
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
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

		res.status(200).json(prescription);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const updatePrescription = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doctorId = req.user?._id;
		const { patientId, details, metadataUri } = req.body;

		const patient = await User.findById(patientId);
		if (!patient) {
			sendErrorResponse(res, 404, 'Patient not found');
			return;
		}

		if (patient.role !== 'Patient') {
			sendErrorResponse(res, 401, 'Invalid request');
			return;
		}

		const updatedPrescription = await Prescription.updateOne(
			{ _id: id },
			{
				doctorId,
				patientId,
				details,
				metadataUri,
			}
		);

		res.status(201).json({
			message: 'Prescription updated successfully',
			prescription: updatedPrescription,
		});
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
