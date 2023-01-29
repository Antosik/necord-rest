import { Injectable } from '@nestjs/common';

import { NecordWebhookService, NecordWebhookServiceImpl } from '../../../src';

@NecordWebhookService()
@Injectable()
export class DiscordBotService implements NecordWebhookServiceImpl {
	public handleWebhook(evt: any): any {
		// The implementation for this method is overriden by the containing module
		console.log(evt);
	}
}
