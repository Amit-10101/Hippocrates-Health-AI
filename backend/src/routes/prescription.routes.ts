import { Router } from 'express';
import authenticate from '../middlewares/authentication.middleware';
import authorize from '../middlewares/authorization.middleware';
import {
	createPrescription,
	downloadPrescriptionPDF,
	getPrescription,
	searchPrescriptions,
	updatePrescription,
} from '../controllers/prescription.controller';
import validate from '../middlewares/validation.middleware';
import { createPrescriptionSchema, updatePrescriptionSchema } from '../schemas/prescription.schema';

const router = Router();

router.post(
	'/create',
	authenticate,
	authorize(['Doctor']),
	validate(createPrescriptionSchema),
	createPrescription
);
router.get('/search', authenticate, authorize(['Doctor', 'Patient']), searchPrescriptions);
router.put(
	'/:id',
	authenticate,
	authorize(['Doctor']),
	validate(updatePrescriptionSchema),
	updatePrescription
);
router.get('/:id', authenticate, authorize(['Doctor', 'Patient']), getPrescription);
router.get(
	'/:id/download/pdf',
	authenticate,
	authorize(['Doctor', 'Patient']),
	downloadPrescriptionPDF
);

export default router;
