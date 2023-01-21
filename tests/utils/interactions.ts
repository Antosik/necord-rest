import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	APIMessage,
	APIMessageApplicationCommandInteraction,
	APIMessageComponentButtonInteraction,
	APIMessageComponentInteraction,
	APIMessageComponentSelectMenuInteraction,
	APIPingInteraction,
	APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	MessageType
} from 'discord-api-types/v10';

const partialInteraction: Pick<APIInteraction, 'id' | 'application_id' | 'token' | 'version'> = {
	id: '1',
	application_id: '1',
	token: 'token',
	version: 1
};

export const pingInteraction: APIPingInteraction = {
	...partialInteraction,
	type: InteractionType.Ping
};

const partialApplicationCommandInteraction: Pick<
	APIApplicationCommandInteraction,
	'type' | 'locale' | 'channel_id' | 'app_permissions'
> = {
	type: InteractionType.ApplicationCommand,
	locale: 'en-US',
	channel_id: '1',
	app_permissions: '1'
};

export const chatInputApplicationCommandInteraction: APIChatInputApplicationCommandInteraction = {
	...partialInteraction,
	...partialApplicationCommandInteraction,
	data: {
		type: ApplicationCommandType.ChatInput,
		id: '1',
		name: 'chat'
	}
};

export const userApplicationCommandInteraction: APIUserApplicationCommandInteraction = {
	...partialInteraction,
	...partialApplicationCommandInteraction,
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
	...partialInteraction,
	...partialApplicationCommandInteraction,
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

const message: APIMessage = {
	id: '1',
	channel_id: '1',
	author: {
		id: '1',
		username: '1',
		discriminator: '1',
		avatar: '1'
	},
	content: '1',
	timestamp: Date.now().toString(),
	edited_timestamp: Date.now().toString(),
	tts: false,
	mention_everyone: false,
	mentions: [],
	mention_roles: [],
	attachments: [],
	embeds: [],
	pinned: false,
	type: MessageType.Default
};

const partialMessageComponentInteraction: Pick<APIMessageComponentInteraction, 'type' | 'message'> =
	{
		type: InteractionType.MessageComponent,
		message
	};

export const messageComponentButtonInteraction: APIMessageComponentButtonInteraction = {
	...partialInteraction,
	...partialApplicationCommandInteraction,
	...partialMessageComponentInteraction,
	data: {
		custom_id: '1',
		component_type: ComponentType.Button
	}
};

export const messageComponentStringSelectMenuInteraction: APIMessageComponentSelectMenuInteraction =
	{
		...partialInteraction,
		...partialApplicationCommandInteraction,
		...partialMessageComponentInteraction,
		data: {
			custom_id: '1',
			component_type: ComponentType.StringSelect,
			values: []
		}
	};

export const messageComponentChannelSelectMenuInteraction: APIMessageComponentSelectMenuInteraction =
	{
		...partialInteraction,
		...partialApplicationCommandInteraction,
		...partialMessageComponentInteraction,
		data: {
			custom_id: '1',
			component_type: ComponentType.ChannelSelect,
			values: [],
			resolved: {
				channels: {}
			}
		}
	};

export const messageComponentUserSelectMenuInteraction: APIMessageComponentSelectMenuInteraction = {
	...partialInteraction,
	...partialApplicationCommandInteraction,
	...partialMessageComponentInteraction,
	data: {
		custom_id: '1',
		component_type: ComponentType.UserSelect,
		values: [],
		resolved: {
			users: {}
		}
	}
};

export const messageComponentRoleSelectMenuInteraction: APIMessageComponentSelectMenuInteraction = {
	...partialInteraction,
	...partialApplicationCommandInteraction,
	...partialMessageComponentInteraction,
	data: {
		custom_id: '1',
		component_type: ComponentType.RoleSelect,
		values: [],
		resolved: {
			roles: {}
		}
	}
};

export const messageComponentMentionableSelectMenuInteraction: APIMessageComponentSelectMenuInteraction =
	{
		...partialInteraction,
		...partialApplicationCommandInteraction,
		...partialMessageComponentInteraction,
		data: {
			custom_id: '1',
			component_type: ComponentType.MentionableSelect,
			values: [],
			resolved: {
				users: {},
				roles: {}
			}
		}
	};
