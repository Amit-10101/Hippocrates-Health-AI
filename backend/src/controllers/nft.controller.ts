import { Request, Response } from 'express';
import { Nft } from '../models/nft.model';
import { ethers } from 'ethers';

export const createNFT = async (req: Request, res: Response) => {
	try {
		const { patientId, prescription, metadataUri } = req.body;

		// -------------

		const nft = await Nft.create({ patientId, prescription, metadataUri });
		res.status(201).json({ success: true, data: nft });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
		return;
	}
};
