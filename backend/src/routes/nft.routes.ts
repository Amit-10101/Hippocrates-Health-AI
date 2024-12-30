import { Router } from 'express';
import { createNFT } from '../controllers/nft.controller';

const router = Router();

router.post('/nft', createNFT);

export default router;
