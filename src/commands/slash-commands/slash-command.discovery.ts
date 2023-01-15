import { Reflector } from '@nestjs/core';
import { Snowflake } from 'discord-api-types/globals';
import {
	APIApplicationCommand,
	APIApplicationCommandOptionBase,
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	LocalizationMap
} from 'discord-api-types/v10';

import { isAutocompleteInteraction, isChatInputInteraction } from './slash-command.utils';
import { OPTIONS_METADATA } from '../../necord.constants';
import { CommandDiscovery, BaseApplicationCommandData } from '../command.discovery';

export interface SlashCommandMeta extends BaseApplicationCommandData {
	type?: ApplicationCommandType.ChatInput;
	description: string;
	description_localizations?: LocalizationMap;
	options?: APIApplicationCommandOptionBase<ApplicationCommandOptionType>[];
}

export interface OptionMeta extends APIApplicationCommandOptionBase<ApplicationCommandOptionType> {}

export class SlashCommandDiscovery extends CommandDiscovery<SlashCommandMeta> {
	private readonly reflector = new Reflector();

	public getGuilds() {
		return this.meta.guilds;
	}

	public getDescription() {
		return this.meta.description;
	}

	public getRawOptions(): Record<string, OptionMeta> {
		return this.reflector.get(OPTIONS_METADATA, this.getHandler()) ?? {};
	}

	public getOptions() {
		return Object.values(this.getRawOptions());
	}

	public getGlobalId() {
		return `${this.getName()}`;
	}

	public isAppliable(
		interaction: APIInteraction
	): interaction is APIChatInputApplicationCommandInteraction {
		return (
			(isChatInputInteraction(interaction) || isAutocompleteInteraction(interaction)) &&
			this.getGlobalId() === interaction.data.name
		);
	}

	public override toJSON() {
		return {
			...this.meta,
			options: this.getOptions()
		};
	}
}
