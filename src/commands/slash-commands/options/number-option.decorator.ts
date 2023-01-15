import {
	APIApplicationCommandNumberOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const NumberOption = createOptionDecorator<APIApplicationCommandNumberOption>(
	ApplicationCommandOptionType.Number
);
