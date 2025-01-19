import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';

let helia: any;
let fs: any;

const initializeHelia = async () => {
	if (!helia) {
		helia = await createHelia();
		fs = unixfs(helia);
	}
};

export const uploadToIPFS = async (data: object) => {
	if (!helia || !fs) await initializeHelia();

	const fileCid = await fs.addBytes(Buffer.from(JSON.stringify(data)));
	return `https://ipfs.infura.io/ipfs/${fileCid.toString()}`;
};

export const getMetadataFromIPFS = async (cidString: string) => {
	if (!helia || !fs) await initializeHelia();

	const cid = CID.parse(cidString);
	const chunks = [];
	for await (const chunk of fs.cat(cid)) {
		chunks.push(chunk);
	}
	const data = Buffer.concat(chunks).toString();
	return JSON.parse(data);
};
