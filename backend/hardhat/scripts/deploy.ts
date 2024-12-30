import { ethers, run, network } from 'hardhat';
import { SimpleStorage__factory, SimpleStorage } from '../typechain-types';
import fs from 'fs';
import path from 'path';

async function main() {
	const SimpleStorageFactory = (await ethers.getContractFactory(
		'SimpleStorage'
	)) as unknown as SimpleStorage__factory;
	console.log('Deploying contract...');

	const simpleStorage = (await SimpleStorageFactory.deploy()) as SimpleStorage;
	await simpleStorage.waitForDeployment();

	const contractAddress = await simpleStorage.getAddress();
	console.log('Contract deployed to address:', contractAddress);

	const deploymentsDir = path.join(__dirname, '../deployments');
	if (!fs.existsSync(deploymentsDir)) {
		fs.mkdirSync(deploymentsDir);
	}
	fs.writeFileSync(
		path.join(deploymentsDir, 'SimpleStorageAddress.json'),
		JSON.stringify({ address: contractAddress }, null, 2)
	);

	console.log('Transaction hash:', simpleStorage.deploymentTransaction()?.hash);
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.log(e);
		process.exit(1);
	});
