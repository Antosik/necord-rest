import {
	APIApplicationCommandMentionableOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { createOptionDecorator } from './option.util';

export const MentionableOption = createOptionDecorator<APIApplicationCommandMentionableOption>(
	ApplicationCommandOptionType.Mentionable
);
