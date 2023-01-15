import { ApplicationCommandType } from 'discord-api-types/v10';

import { BaseApplicationCommandData } from '../command.interface';

export interface MessageApplicationCommandData extends BaseApplicationCommandData {
	type: ApplicationCommandType.Message;
}

export interface UserApplicationCommandData extends BaseApplicationCommandData {
	type: ApplicationCommandType.User;
}

export type ContextMenuMeta = MessageApplicationCommandData | UserApplicationCommandData;
