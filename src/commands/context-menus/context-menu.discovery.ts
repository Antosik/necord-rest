import {
	APIContextMenuInteraction,
	APIInteraction,
	ApplicationCommandType
} from 'discord-api-types/v10';

import { isContextMenuInteraction } from './context-menu.utils';
import { BaseApplicationCommandData, CommandDiscovery } from '../command.discovery';

export interface MessageApplicationCommandData extends BaseApplicationCommandData {
	type: ApplicationCommandType.Message;
}

export interface UserApplicationCommandData extends BaseApplicationCommandData {
	type: ApplicationCommandType.User;
}

export type ContextMenuMeta = MessageApplicationCommandData | UserApplicationCommandData;

export class ContextMenuDiscovery extends CommandDiscovery<ContextMenuMeta> {
	public getType() {
		return this.meta.type;
	}

	public getGlobalId() {
		return `${this.getType()}:${this.getName()}`;
	}

	public isAppliable(interaction: APIInteraction): interaction is APIContextMenuInteraction {
		return (
			isContextMenuInteraction(interaction) &&
			this.getGlobalId() === `${interaction.data.type}:${interaction.data.name}`
		);
	}

	public override toJSON() {
		return this.meta;
	}
}
