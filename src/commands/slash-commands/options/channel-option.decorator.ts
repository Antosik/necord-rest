import {
	APIApplicationCommandChannelOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { createOptionDecorator } from './option.util';

export const ChannelOption = createOptionDecorator<APIApplicationCommandChannelOption>(
	ApplicationCommandOptionType.Channel
);
