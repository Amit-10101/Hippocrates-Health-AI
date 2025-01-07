import { z } from 'zod';
import { Schema } from 'mongoose';

export const createPrescriptionSchema = z.object({
	patientId: z.string({ message: 'Invalid Patient ID' }),
	details: z.string().min(1, { message: 'Details must not be empty' }),
	// medication: z.array(
	// 	z.object({
	// 		name: z.string().min(1, { message: 'Medication name must not be empty' }),
	// 		dosage: z.string().min(1, { message: 'Dosage must not be empty' }),
	// 		frequency: z.string().min(1, { message: 'Frequency must not be empty' }),
	// 	})
	// ),
	// metadataUri: z.string().url({ message: 'Invalid URL' }),
});

export const updatePrescriptionSchema = z.object({
	details: z.string().min(1, { message: 'Details must not be empty' }).optional(),
	// medication: z
	// 	.array(
	// 		z.object({
	// 			name: z.string().min(1, { message: 'Medication name must not be empty' }),
	// 			dosage: z.string().min(1, { message: 'Dosage must not be empty' }),
	// 			frequency: z.string().min(1, { message: 'Frequency must not be empty' }),
	// 		})
	// 	)
	// 	.optional(),
	// metadataUri: z.string().url({ message: 'Invalid URL' }).optional(),
});
