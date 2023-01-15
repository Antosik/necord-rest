import { APIInteraction, APIInteractionResponse } from 'discord-api-types/v10';

export abstract class CommandHandler {
	abstract handle(
		interaction: APIInteraction
	): APIInteractionResponse | Promise<APIInteractionResponse>;
}
