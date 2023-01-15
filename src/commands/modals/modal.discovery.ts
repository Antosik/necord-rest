import { match } from 'path-to-regexp';
import { APIInteraction, APIModalSubmitInteraction } from 'discord-api-types/v10';
import { isModalSubmitInteraction } from './modals.utils';
import { NecordBaseDiscovery } from '../../context';

export interface ModalMeta {
	customId: string;
}

export class ModalDiscovery extends NecordBaseDiscovery<ModalMeta> {
	public readonly matcher = match(this.meta.customId);

	public getCustomId() {
		return this.meta.customId;
	}

	public getGlobalId() {
		return `${this.getCustomId()}`;
	}

	public isAppliable(interaction: APIInteraction): interaction is APIModalSubmitInteraction {
		return (
			isModalSubmitInteraction(interaction) &&
			this.getGlobalId() === interaction.data.custom_id
		);
	}

	public override toJSON(): Record<string, any> {
		return this.meta;
	}
}
