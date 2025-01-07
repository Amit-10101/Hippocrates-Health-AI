import { Response } from 'express';

interface ApiResponse {
	success: boolean;
	message: string;
	data?: any;
	error?: any;
}

export const sendSuccessResponse = (
	res: Response,
	statusCode: number = 200,
	message: string,
	data?: any
) => {
	const response: ApiResponse = {
		success: true,
		message,
		data,
	};
	res.status(statusCode).json(response);
};

export const sendErrorResponse = (
	res: Response,
	statusCode: number = 400,
	message: string,
	error?: any
) => {
	const response: ApiResponse = {
		success: false,
		message,
		error,
	};
	res.status(statusCode).json(response);
};
