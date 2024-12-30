import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
	try {
		const userData = req.body;
		const newUser = await User.create(userData);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.find({ email: email });

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
