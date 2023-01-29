import { sign } from 'tweetnacl';

export type Encoder = {
	getPublicKey: () => string;
	createSignature: <T>(json: T) => { timestamp: string; signature: string };
};

export function createEncoder(): Encoder {
	const ed25519KeyPair = sign.keyPair();

	const getPublicKey = () => Buffer.from(ed25519KeyPair.publicKey).toString('hex');

	const createSignature = <T>(json: T) => {
		const timestamp = Date.now().toString();

		const signature = sign.detached(
			Buffer.from(timestamp + JSON.stringify(json), 'utf-8'),
			ed25519KeyPair.secretKey
		);

		return {
			timestamp,
			signature: Buffer.from(signature).toString('hex')
		};
	};

	return {
		getPublicKey,
		createSignature
	};
}
