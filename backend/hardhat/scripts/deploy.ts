import { ethers, run, network } from 'hardhat';
import { PrescriptionNFT__factory, PrescriptionNFT } from '../typechain-types';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
	const PrescriptionNFTFactory = (await ethers.getContractFactory(
		'PrescriptionNFT'
	)) as unknown as PrescriptionNFT__factory;
	console.log('Deploying PrescriptionNFT contract...');

	const prescriptionNFT = (await PrescriptionNFTFactory.deploy()) as PrescriptionNFT;
	await prescriptionNFT.waitForDeployment();

	const contractAddress = await prescriptionNFT.getAddress();
	console.log('Contract deployed to address:', contractAddress);

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const deploymentsDir = path.join(__dirname, '../deployments');
	if (!fs.existsSync(deploymentsDir)) {
		fs.mkdirSync(deploymentsDir);
	}
	fs.writeFileSync(
		path.join(deploymentsDir, 'PrescriptionNFTAddress.json'),
		JSON.stringify({ address: contractAddress }, null, 2)
	);

	console.log('Transaction hash:', prescriptionNFT.deploymentTransaction()?.hash);
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.log(e);
		process.exit(1);
	});
