import { Injectable } from '@nestjs/common';

import { NecordWebhookService } from '../../src';
import { NECORD_WEBHOOK_SERVICE } from '../../src/necord.constants';

describe('NecordWebhookService Decorator', () => {
	@Injectable()
	@NecordWebhookService()
	class WebhookService {}

	it('should set marker to true', () => {
		expect(Reflect.getMetadata(NECORD_WEBHOOK_SERVICE, WebhookService)).toBeTruthy();
	});
});
