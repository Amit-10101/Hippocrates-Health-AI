import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/response';

const authorize = (roles: ('Doctor' | 'Patient')[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const userRole = req.user?.role;
		// if (userRole) console.log(userRole, ' ---- ', roles, roles.includes(userRole));

		if (userRole && !roles.includes(userRole)) {
			sendErrorResponse(res, 403, 'Access Denied');
			return;
		}

		// console.log('NEXTING');

		next();
	};
};

export default authorize;
