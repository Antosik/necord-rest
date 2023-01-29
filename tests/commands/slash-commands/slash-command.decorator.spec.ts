import { Injectable } from '@nestjs/common';
import { ApplicationCommandType } from 'discord-api-types/v10';

import { SlashCommand } from '../../../src';
import { SlashCommandMeta } from '../../../src/commands/slash-commands/slash-command.interface';
import { SLASH_COMMAND_METADATA } from '../../../src/necord.constants';

describe('Slash Commands > SlashCommand Decorator', () => {
	const meta: SlashCommandMeta = {
		name: 'time',
		description: 'Returns current time'
	};

	@Injectable()
	class DiscordService {
		@SlashCommand(meta)
		static menu() {
			return 'ok';
		}
	}

	it('should set slash command meta', () => {
		const metaFromDecorator = Reflect.getMetadata(SLASH_COMMAND_METADATA, DiscordService.menu);
		expect(metaFromDecorator.meta).toEqual({
			...meta,
			type: ApplicationCommandType.ChatInput
		});
	});
});
