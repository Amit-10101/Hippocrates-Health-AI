import { Schema, model, Document } from 'mongoose';

interface IPrescription extends Document {
	doctorId: Schema.Types.ObjectId;
	patientId: Schema.Types.ObjectId;
	details: string;
	metadataUri: string;
	createdAt: Date;
	updatedAt: Date;
}

const prescriptionSchema = new Schema<IPrescription>({
	doctorId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	patientId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	details: {
		type: String,
		required: true,
	},
	metadataUri: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const Prescription = model<IPrescription>('Prescription', prescriptionSchema);

export default Prescription;
