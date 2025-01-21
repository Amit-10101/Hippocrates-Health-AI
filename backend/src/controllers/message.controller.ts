import { Request, Response } from 'express';
import User from '../models/user.model';
import Message from '../models/message.model';
import { sendEmail } from '../utils/email';
import { sendErrorResponse, sendSuccessResponse } from '../utils/response';

export const sendQuery = async (req: Request, res: Response) => {
	try {
		const { doctorId, subject, content } = req.body;
		const patientId = req.user?._id;

		const doctor = await User.findById(doctorId);
		if (!doctor || doctor.role !== 'Doctor') {
			sendErrorResponse(res, 404, 'Doctor not found');
			return;
		}

		const message = await Message.create({
			senderId: patientId,
			recipientId: doctorId,
			subject,
			content,
		});

		await sendEmail(doctor.email, subject, content);

		sendSuccessResponse(res, 200, 'Query sent successfully', message);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const sendSolution = async (req: Request, res: Response) => {
	try {
		const { patientId, subject, content } = req.body;
		const doctorId = req.user?._id;

		const patient = await User.findById(patientId);
		if (!patient || patient.role !== 'Patient') {
			sendErrorResponse(res, 404, 'Patient not found');
			return;
		}

		const message = await Message.create({
			senderId: doctorId,
			recipientId: patientId,
			subject,
			content,
		});

		await sendEmail(patient.email, subject, content);

		sendSuccessResponse(res, 200, 'Solution sent successfully', message);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};
