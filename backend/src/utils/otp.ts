import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const generateOtp = async (): Promise<{ otp: string; otpHash: string }> => {
	const otp = crypto.randomInt(100000, 999999).toString();
	const otpHash = await bcrypt.hash(otp, 10);
	return { otp, otpHash };
};

export const verifyOtp = async (otp: string, otpHash: string): Promise<boolean> => {
	return await bcrypt.compare(otp, otpHash);
};
