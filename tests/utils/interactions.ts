import {
	APIChatInputApplicationCommandInteraction,
	APIMessageApplicationCommandInteraction,
	APIPingInteraction,
	APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	InteractionType
} from 'discord-api-types/v10';

export const pingInteraction: APIPingInteraction = {
	type: InteractionType.Ping,
	id: '1',
	application_id: '1',
	token: 'token',
	version: 1
};

export const chatInputApplicationCommandInteraction: APIChatInputApplicationCommandInteraction = {
	type: InteractionType.ApplicationCommand,
	id: '1',
	application_id: '1',
	token: 'token',
	version: 1,
	locale: 'en-US',
	channel_id: '1',
	app_permissions: '1',
	data: {
		type: ApplicationCommandType.ChatInput,
		id: '1',
		name: 'chat'
	}
};

export const userApplicationCommandInteraction: APIUserApplicationCommandInteraction = {
	type: InteractionType.ApplicationCommand,
	id: '1',
	application_id: '1',
	token: 'token',
	version: 1,
	locale: 'en-US',
	channel_id: '1',
	app_permissions: '1',
	data: {
		type: ApplicationCommandType.User,
		id: '1',
		name: 'user',
		target_id: '1',
		resolved: {
			users: {}
		}
	}
};

export const messageApplicationCommandInteraction: APIMessageApplicationCommandInteraction = {
	type: InteractionType.ApplicationCommand,
	id: '1',
	application_id: '1',
	token: 'token',
	version: 1,
	locale: 'en-US',
	channel_id: '1',
	app_permissions: '1',
	data: {
		type: ApplicationCommandType.Message,
		id: '1',
		name: 'message',
		target_id: '1',
		resolved: {
			messages: {}
		}
	}
};
