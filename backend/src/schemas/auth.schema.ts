import { z } from 'zod';

export const registerSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: 'First name must be at least 3 characters long' })
		.max(50, { message: 'First name cannot exceed 50 characters' }),
	lastName: z.string().max(50, { message: 'Last name cannot exceed 50 characters' }).optional(),
	email: z.string().email({ message: 'Invalid Email' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(50, { message: 'Password cannot exceed 50 characters' })
		.regex(/[A-Z]/, {
			message: 'Password must contain at least one uppercase letter.',
		})
		.regex(/[a-z]/, {
			message: 'Password must contain at least one lowercase letter.',
		})
		.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Password must contain at least one special character.',
		}),
	role: z.enum(['Doctor', 'Patient']),
});

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid Email' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(50, { message: 'Password cannot exceed 50 characters' })
		.regex(/[A-Z]/, {
			message: 'Password must contain at least one uppercase letter.',
		})
		.regex(/[a-z]/, {
			message: 'Password must contain at least one lowercase letter.',
		})
		.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Password must contain at least one special character.',
		}),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'Invalid Email' }),
});

export const verifyAccountSchema = z.object({
	email: z.string().email(),
	otp: z
		.string()
		.min(6, { message: 'OTP must be 6 digits long' })
		.max(6, { message: 'OTP must be 6 digits long' }),
});

export const changePasswordSchema = z.object({
	email: z.string().email(),
	otp: z
		.string()
		.min(6, { message: 'OTP must be 6 digits long' })
		.max(6, { message: 'OTP must be 6 digits long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(50, { message: 'Password cannot exceed 50 characters' })
		.regex(/[A-Z]/, {
			message: 'Password must contain at least one uppercase letter.',
		})
		.regex(/[a-z]/, {
			message: 'Password must contain at least one lowercase letter.',
		})
		.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Password must contain at least one special character.',
		}),
});
