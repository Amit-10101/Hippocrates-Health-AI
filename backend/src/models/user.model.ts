import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	_id: Schema.Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: 'Doctor' | 'Patient';
	ethereumAddress?: string;
	isVerified: boolean;
	otp?: string;
	otpExpires?: Date;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: ['Doctor', 'Patient'],
		},
		ethereumAddress: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		otp: {
			type: String,
		},
		otpExpires: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const User = model<IUser>('User', userSchema);

export default User;
