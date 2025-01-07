import { Router } from 'express';
import {
	register,
	login,
	forgotPassword,
	verifyAccount,
	changePassword,
} from '../controllers/auth.controller';
import validate from '../middlewares/validation.middleware';
import {
	changePasswordSchema,
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	verifyAccountSchema,
} from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/verify-account', validate(verifyAccountSchema), verifyAccount);
router.post('/change-password', validate(changePasswordSchema), changePassword);

export default router;
