import { APIContextMenuInteraction, APIInteraction } from 'discord-api-types/v10';

import { ContextMenuMeta } from './context-menu.interface';
import { isContextMenuInteraction } from './context-menu.utils';
import { CommandDiscovery } from '../command.discovery';

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
