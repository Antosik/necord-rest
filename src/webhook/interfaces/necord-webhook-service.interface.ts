import { APIInteraction, APIInteractionResponse } from 'discord-api-types/v10';

export interface NecordWebhookServiceImpl {
	handleWebhook(event: APIInteraction): APIInteractionResponse;
}
