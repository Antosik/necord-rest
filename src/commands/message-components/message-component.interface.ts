import { APIMessageComponentInteractionData } from 'discord-api-types/v10';

export interface MessageComponentMeta {
	type: APIMessageComponentInteractionData['component_type'];
	customId: string;
}
