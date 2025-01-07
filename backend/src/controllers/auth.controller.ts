import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { generateOtp, verifyOtp } from '../utils/otp';
import { sendOtpEmail } from '../utils/email';
import { sendErrorResponse, sendSuccessResponse } from '../utils/response';

export const register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, role } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			sendErrorResponse(res, 400, 'User already exists with this email address.');
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role,
		});

		// Generate OTP
		const { otp, otpHash } = await generateOtp();
		newUser.otp = otpHash;
		newUser.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
		await newUser.save();

		// Send OTP email
		await sendOtpEmail(email, otp);

		sendSuccessResponse(
			res,
			201,
			'User registered successfully. Please check your email for the OTP to verify your account.'
		);
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			sendErrorResponse(res, 401, 'Invalid email/password');
			return;
		}

		if (!user.isVerified) {
			sendErrorResponse(res, 403, 'Account not verified. Please verify your email.');
			return;
		}

		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});

		const userObject = {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			isVerified: user.isVerified,
			createdAt: user.createdAt,
		};

		sendSuccessResponse(res, 200, 'Login successful', { user: userObject, token });
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const verifyAccount = async (req: Request, res: Response) => {
	try {
		const { email, otp } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			sendErrorResponse(res, 404, 'Invalid email. User not found.');
			return;
		}

		if (user.otpExpires && user.otpExpires < new Date()) {
			sendErrorResponse(res, 400, 'OTP has expired');
			return;
		}

		const isOtpValid = await verifyOtp(otp, user.otp!);
		if (!isOtpValid) {
			sendErrorResponse(res, 400, 'Invalid OTP');
			return;
		}

		user.isVerified = true;
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		sendSuccessResponse(res, 200, 'Email verified successfully');
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			sendErrorResponse(res, 404, 'Invalid email. User not found.');
			return;
		}

		const { otp, otpHash } = await generateOtp();
		user.otp = otpHash;
		user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
		await user.save();

		await sendOtpEmail(email, otp);

		sendSuccessResponse(res, 200, 'OTP has been sent to your email address.');
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};

export const changePassword = async (req: Request, res: Response) => {
	try {
		const { email, otp, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			sendErrorResponse(res, 404, 'Invalid email. User not found.');
			return;
		}

		if (user.otpExpires && user.otpExpires < new Date()) {
			sendErrorResponse(res, 400, 'OTP has expired');
			return;
		}

		const isOtpValid = await verifyOtp(otp, user.otp!);
		if (!isOtpValid) {
			sendErrorResponse(res, 400, 'Invalid OTP');
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		sendSuccessResponse(res, 200, 'Password changed successfully');
	} catch (error) {
		sendErrorResponse(res, 400, (error as Error).message);
	}
};
