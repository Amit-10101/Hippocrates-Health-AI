import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IPrescription extends Document {
	_id: Schema.Types.ObjectId;
	doctorId: Schema.Types.ObjectId | IUser;
	patientId: Schema.Types.ObjectId | IUser;
	details: string;
	metadataUri: string;
	nftId: number;
	transactionHash: string;
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
	nftId: {
		type: Number,
		required: true,
	},
	transactionHash: {
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
