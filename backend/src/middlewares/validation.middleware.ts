import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { sendErrorResponse } from '../utils/response';

const validate = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { success, error } = schema.safeParse(req.body);

		if (!success) {
			sendErrorResponse(
				res,
				400,
				'Validation failed',
				error.errors.map((e) => e.message)
			);
			return;
		}

		next();
	};
};

export default validate;
