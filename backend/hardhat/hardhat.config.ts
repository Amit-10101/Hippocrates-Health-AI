import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-ethers';
import '@typechain/hardhat';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
const ALCHEMY_API_URI = process.env.ALCHEMY_API_URI as string;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
	solidity: '0.8.9',
	networks: {
		hardhat: {},
		sepolia: {
			url: `${ALCHEMY_API_URI}${ALCHEMY_API_KEY}`,
			accounts: [SEPOLIA_PRIVATE_KEY],
		},
	},
	paths: {
		artifacts: './artifacts',
	},
	typechain: {
		outDir: 'typechain-types',
		target: 'ethers-v6',
	},
};

export default config;
