import {
	APIApplicationCommandRoleOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const RoleOption = createOptionDecorator<APIApplicationCommandRoleOption>(
	ApplicationCommandOptionType.Role
);
