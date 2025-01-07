import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/response';

interface JwtPayload {
	_id: string;
	role: 'Doctor' | 'Patient';
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		sendErrorResponse(res, 401, 'Access Denied. No token provided.');
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		sendErrorResponse(res, 401, 'Invalid token');
	}
};

export default authenticate;
