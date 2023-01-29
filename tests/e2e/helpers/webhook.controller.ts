import { Body, Controller, Post } from '@nestjs/common';

import { DiscordBotService } from './webhook.service';
import { NecordWebhookController } from '../../../src';

@Controller('discord-bot')
export class DiscordBotController {
	constructor(private readonly discordBotService: DiscordBotService) {}

	@NecordWebhookController()
	@Post('/webhook')
	async handleWebhook(@Body() body) {
		return await this.discordBotService.handleWebhook(body);
	}
}
