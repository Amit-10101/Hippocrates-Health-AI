import { Router } from 'express';
import authenticate from '../middlewares/authentication.middleware';
import authorize from '../middlewares/authorization.middleware';
import {
	createPrescription,
	getPrescription,
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
router.put(
	'/:id',
	authenticate,
	authorize(['Doctor']),
	validate(updatePrescriptionSchema),
	updatePrescription
);
router.get('/:id', authenticate, authorize(['Doctor', 'Patient']), getPrescription);

export default router;
