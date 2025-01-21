import { Router } from 'express';
import authenticate from '../middlewares/authentication.middleware';
import authorize from '../middlewares/authorization.middleware';
import { sendQuery, sendSolution } from '../controllers/message.controller';

const router = Router();

router.post('/send-query', authenticate, authorize(['Patient']), sendQuery);
router.post('/send-solution', authenticate, authorize(['Doctor']), sendSolution);

export default router;
