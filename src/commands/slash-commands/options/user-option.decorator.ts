import {
	APIApplicationCommandUserOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { createOptionDecorator } from './option.util';

export const UserOption = createOptionDecorator<APIApplicationCommandUserOption>(
	ApplicationCommandOptionType.User
);
