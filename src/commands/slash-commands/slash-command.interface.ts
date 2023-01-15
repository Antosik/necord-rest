import {
	APIApplicationCommandOptionBase,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	LocalizationMap
} from 'discord-api-types/v10';

import { BaseApplicationCommandData } from '../command.interface';

export interface SlashCommandMeta extends BaseApplicationCommandData {
	type?: ApplicationCommandType.ChatInput;
	description: string;
	description_localizations?: LocalizationMap;
	options?: APIApplicationCommandOptionBase<ApplicationCommandOptionType>[];
}

export interface OptionMeta extends APIApplicationCommandOptionBase<ApplicationCommandOptionType> {}
