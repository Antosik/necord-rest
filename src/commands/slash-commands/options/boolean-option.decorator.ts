import {
	APIApplicationCommandBooleanOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { createOptionDecorator } from './option.util';

export const BooleanOption = createOptionDecorator<APIApplicationCommandBooleanOption>(
	ApplicationCommandOptionType.Boolean
);
