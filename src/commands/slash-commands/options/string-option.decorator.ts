import {
	APIApplicationCommandStringOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const StringOption = createOptionDecorator<APIApplicationCommandStringOption>(
	ApplicationCommandOptionType.String
);
