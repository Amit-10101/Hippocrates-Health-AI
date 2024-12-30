import { Schema, model, Document } from 'mongoose';

interface INFT extends Document {
	patientId: string;
	prescription: string;
	metadataUri: string;
	createdAt: Date;
}

const nftSchema = new Schema<INFT>({
	patientId: {
		type: String,
		required: true,
	},
	prescription: {
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
});

export const Nft = model<INFT>('NFT', nftSchema);
