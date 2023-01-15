import {
	APIApplicationCommandIntegerOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const IntegerOption = createOptionDecorator<APIApplicationCommandIntegerOption>(
	ApplicationCommandOptionType.Integer
);
