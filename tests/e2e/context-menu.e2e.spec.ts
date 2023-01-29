import { INestApplication, Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
	APIInteractionDataResolvedGuildMember,
	APIInteractionResponse,
	APIMessage,
	APIMessageApplicationCommandInteraction,
	APIUser,
	APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	InteractionResponseType
} from 'discord-api-types/v10';

import { createNecordCall } from './helpers/discord.helper';
import { createEncoder } from './helpers/encoder.helper';
import { DiscordBotController } from './helpers/webhook.controller';
import { DiscordBotService } from './helpers/webhook.service';
import {
	Context,
	MessageCommand,
	MessageCommandContext,
	NecordModule,
	TargetMember,
	TargetMessage,
	TargetUser,
	UserCommand,
	UserCommandContext
} from '../../src';
import { NecordModuleOptions } from '../../src/necord-options.interface';
import {
	chatInputApplicationCommandInteraction,
	guildMember,
	message,
	messageApplicationCommandInteraction,
	partialApplicationCommandInteraction,
	partialInteraction,
	user,
	userApplicationCommandInteraction
} from '../utils/interactions';

@Injectable()
class ContextMenuService {
	@MessageCommand({
		name: 'Clone message'
	})
	public handleCloneMessage(
		@Context() interaction: MessageCommandContext,
		@TargetMessage() message: APIMessage
	): APIInteractionResponse {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: message.content,
				embeds: message.embeds,
				attachments: message.attachments,
				components: message.components
			}
		};
	}

	@UserCommand({
		name: 'Poke User'
	})
	public handlePokeUser(
		@Context() interaction: UserCommandContext,
		@TargetUser() user: APIUser
	): APIInteractionResponse {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `You poked ${user.username}`
			}
		};
	}

	@UserCommand({
		name: 'Poke Guild Member'
	})
	public handlePokeGuildMember(
		@Context() interaction: UserCommandContext,
		@TargetMember() guildMember: APIInteractionDataResolvedGuildMember
	): APIInteractionResponse {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: `You poked ${guildMember.nick}`
			}
		};
	}
}

describe('Context Menu E2E', () => {
	let app: INestApplication;

	const encoder = createEncoder();
	const options: NecordModuleOptions = {
		applicationId: 'applicationId',
		publicKey: encoder.getPublicKey(),
		token: 'token',
		skipRegistration: true
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [NecordModule.forRoot(options)],
			providers: [DiscordBotService, ContextMenuService],
			controllers: [DiscordBotController]
		}).compile();

		app = moduleRef.createNestApplication({ rawBody: true });

		await app.init();
	});

	describe('Message Component', () => {
		it(`should ignore not related interaction types`, async () => {
			return createNecordCall(chatInputApplicationCommandInteraction, { app, encoder })
				.expect({})
				.expect(200);
		});

		it(`should ignore interaction with unmatched names`, async () => {
			return createNecordCall(messageApplicationCommandInteraction, { app, encoder })
				.expect({})
				.expect(200);
		});

		it(`should handle message command`, async () => {
			const interaction: APIMessageApplicationCommandInteraction = {
				...partialInteraction,
				...partialApplicationCommandInteraction,
				data: {
					type: ApplicationCommandType.Message,
					id: '1',
					name: 'Clone message',
					target_id: '1',
					resolved: {
						messages: {
							'1': message
						}
					}
				}
			};
			return createNecordCall(interaction, { app, encoder })
				.expect({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: '1',
						embeds: [],
						attachments: [],
						components: []
					}
				})
				.expect(200);
		});
	});

	describe('User Component', () => {
		it(`should ignore not related interaction types`, async () => {
			return createNecordCall(chatInputApplicationCommandInteraction, { app, encoder })
				.expect({})
				.expect(200);
		});

		it(`should ignore interaction with unmatched names`, async () => {
			return createNecordCall(userApplicationCommandInteraction, { app, encoder })
				.expect({})
				.expect(200);
		});

		it(`should handle user command and resolve user`, async () => {
			const interaction: APIUserApplicationCommandInteraction = {
				...partialInteraction,
				...partialApplicationCommandInteraction,
				data: {
					type: ApplicationCommandType.User,
					id: '1',
					name: 'Poke User',
					target_id: '1',
					resolved: {
						users: {
							'1': user
						}
					}
				}
			};
			return createNecordCall(interaction, { app, encoder })
				.expect({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `You poked ${user.username}`
					}
				})
				.expect(200);
		});

		it(`should handle user command and resolve guild member`, async () => {
			const interaction: APIUserApplicationCommandInteraction = {
				...partialInteraction,
				...partialApplicationCommandInteraction,
				data: {
					type: ApplicationCommandType.User,
					id: '1',
					name: 'Poke Guild Member',
					target_id: '1',
					resolved: {
						users: {
							'1': user
						},
						members: {
							'1': guildMember
						}
					}
				}
			};
			return createNecordCall(interaction, { app, encoder })
				.expect({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `You poked ${guildMember.nick}`
					}
				})
				.expect(200);
		});
	});
});
