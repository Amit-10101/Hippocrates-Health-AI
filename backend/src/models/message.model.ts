import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
	senderId: Schema.Types.ObjectId;
	recipientId: Schema.Types.ObjectId;
	subject: string;
	content: string;
	createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
	senderId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	recipientId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	subject: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
