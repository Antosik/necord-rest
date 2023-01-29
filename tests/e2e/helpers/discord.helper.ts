import type { Encoder } from './encoder.helper';

import type { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

export function createNecordCall<T extends object>(
	input: T,
	{ app, encoder }: { app: INestApplication; encoder: Encoder }
) {
	const sign = encoder.createSignature(input);
	return request(app.getHttpServer())
		.post('/discord-bot/webhook')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.set('x-signature-ed25519', sign.signature)
		.set('x-signature-timestamp', sign.timestamp)
		.send(input);
}
