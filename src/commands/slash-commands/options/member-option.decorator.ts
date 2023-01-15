import {
	APIApplicationCommandUserOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const MemberOption = createOptionDecorator<APIApplicationCommandUserOption>(
	ApplicationCommandOptionType.User
);
