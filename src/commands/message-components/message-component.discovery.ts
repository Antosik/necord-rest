import { APIMessageComponentInteraction, APIInteraction } from 'discord-api-types/v10';
import { match } from 'path-to-regexp';

import { MessageComponentMeta } from './message-component.interface';
import { isMessageComponentInteraction } from './message-component.utils';
import { NecordBaseDiscovery } from '../../context/necord-base.discovery';

export class MessageComponentDiscovery extends NecordBaseDiscovery<MessageComponentMeta> {
	public readonly matcher = match([this.meta.type.toString(), this.meta.customId].join('_'));

	public getType() {
		return this.meta.type;
	}

	public getCustomId() {
		return this.meta.customId;
	}

	public getGlobalId() {
		return `${this.getType()}_${this.getCustomId()}`;
	}

	public isAppliable(interaction: APIInteraction): interaction is APIMessageComponentInteraction {
		return (
			isMessageComponentInteraction(interaction) &&
			this.getGlobalId() ===
				`${interaction.data.component_type}_${interaction.data.custom_id}`
		);
	}

	public override toJSON(): Record<string, any> {
		return this.meta;
	}
}
