import { SetMetadata } from '@nestjs/common';
import { ApplicationCommandType } from 'discord-api-types/v10';

import { SLASH_COMMAND_METADATA } from '../../../necord.constants';
import { SlashCommandDiscovery } from '../slash-command.discovery';
import { SlashCommandMeta } from '../slash-command.interface';

export const SlashCommand = (options: Omit<SlashCommandMeta, 'type'>): MethodDecorator =>
	SetMetadata<string, SlashCommandDiscovery>(
		SLASH_COMMAND_METADATA,
		new SlashCommandDiscovery({
			type: ApplicationCommandType.ChatInput,
			...options
		})
	);
