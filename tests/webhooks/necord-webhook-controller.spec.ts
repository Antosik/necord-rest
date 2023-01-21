import { Controller, INestApplication, Injectable, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { sign } from 'tweetnacl';

import { NecordWebhookController } from '../../src';
import { NecordModuleOptions } from '../../src/necord-options.interface';
import { NECORD_MODULE_OPTIONS } from '../../src/necord.constants';

@Injectable()
@Controller('/')
class TestController {
	@NecordWebhookController()
	@Post('/')
	root() {
		return { data: 'ok' };
	}
}

const ed25519KeyPair = sign.keyPair();

const options: NecordModuleOptions = {
	applicationId: 'applicationId',
	publicKey: Buffer.from(ed25519KeyPair.publicKey).toString('hex'),
	token: 'token',
	skipRegistration: true
};

describe('NecordWebhookController', () => {
	describe('App without raw body enabled', () => {
		let appWithoutRawBodyEnabled: INestApplication;

		beforeAll(async () => {
			const moduleRef = await Test.createTestingModule({
				providers: [
					{
						provide: NECORD_MODULE_OPTIONS,
						useValue: options
					}
				],
				controllers: [TestController]
			}).compile();

			appWithoutRawBodyEnabled = moduleRef.createNestApplication();

			await appWithoutRawBodyEnabled.init();
		});

		it(`should fail with not enabled raw body`, async () => {
			return request(appWithoutRawBodyEnabled.getHttpServer()).post('/').expect(500);
		});
	});

	describe('App with raw body enabled', () => {
		let appWithRawBodyEnabled: INestApplication;

		beforeAll(async () => {
			const moduleRef = await Test.createTestingModule({
				providers: [
					{
						provide: NECORD_MODULE_OPTIONS,
						useValue: options
					}
				],
				controllers: [TestController]
			}).compile();

			appWithRawBodyEnabled = moduleRef.createNestApplication({ rawBody: true });

			await appWithRawBodyEnabled.init();
		});

		it(`should prevent access with empty signature`, async () => {
			return request(appWithRawBodyEnabled.getHttpServer())
				.post('/')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('x-signature-timestamp', Date.now().toString())
				.send({ data: 'ok' })
				.expect(401);
		});

		it(`should prevent access with empty timestamp`, async () => {
			return request(appWithRawBodyEnabled.getHttpServer())
				.post('/')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('x-signature-ed25519', 'a')
				.send({ data: 'ok' })
				.expect(401);
		});

		it(`should not access with incorrect signature`, async () => {
			return request(appWithRawBodyEnabled.getHttpServer())
				.post('/')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('x-signature-ed25519', 'a')
				.set('x-signature-timestamp', Date.now().toString())
				.send({ data: 'ok' })
				.expect(401);
		});

		it(`should access with correct signature`, async () => {
			const timestamp = Date.now().toString();

			const signature = sign.detached(
				Buffer.from(timestamp + JSON.stringify({ data: 'ok' }), 'utf-8'),
				ed25519KeyPair.secretKey
			);

			return request(appWithRawBodyEnabled.getHttpServer())
				.post('/')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('x-signature-ed25519', Buffer.from(signature).toString('hex'))
				.set('x-signature-timestamp', timestamp)
				.send({ data: 'ok' })
				.expect(200)
				.expect({
					data: 'ok'
				});
		});
	});
});
