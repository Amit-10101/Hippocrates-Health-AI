import { ethers } from 'ethers';
import PrescriptionNFT from '../../hardhat/artifacts/contracts/PrescriptionNFT.sol/PrescriptionNFT.json';

const rpcUrl = process.env.ALCHEMY_API_URI! + process.env.ALCHEMY_API_KEY!;

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY!, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, PrescriptionNFT.abi, wallet);

export const mintNFT = async ({ recipient, tokenURI }: { recipient: string; tokenURI: string }) => {
	const tx = await contract.mintNFT(recipient, tokenURI);
	const receipt = await tx.wait();

	const iface = new ethers.Interface(PrescriptionNFT.abi);
	let tokenId = null;

	for (const log of receipt.logs) {
		try {
			const event = iface.parseLog(log);
			if (event && event.name === 'Transfer') {
				tokenId = event.args.tokenId.toString();
				break;
			}
		} catch (error) {
			throw new Error('Error while minting NFT. Token not found.');
		}
	}
	console.log(receipt);

	return { tokenId, transactionHash: receipt.hash };
};
