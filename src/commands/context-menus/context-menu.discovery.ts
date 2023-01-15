import {
	APIContextMenuInteraction,
	APIInteraction,
	APIMessageApplicationCommandInteractionData,
	APIUserApplicationCommandInteractionData,
	ApplicationCommandType
} from 'discord-api-types/v10';
import { BaseApplicationCommandData } from '..';
import { CommandDiscovery } from '../command.discovery';
import { isContextMenuInteraction } from './context-menu.utils';

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
