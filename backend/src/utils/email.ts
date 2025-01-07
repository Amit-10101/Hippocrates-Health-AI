import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Email Verification OTP',
		text: `Your OTP for email verification is: ${otp}`,
	};
	await transporter.sendMail(mailOptions);
};
