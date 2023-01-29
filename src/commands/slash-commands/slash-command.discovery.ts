import { Reflector } from '@nestjs/core';
import { APIChatInputApplicationCommandInteraction, APIInteraction } from 'discord-api-types/v10';

import { OptionMeta, SlashCommandMeta } from './slash-command.interface';
import { isAutocompleteInteraction, isChatInputInteraction } from './slash-command.utils';
import { OPTIONS_METADATA } from '../../necord.constants';
import { CommandDiscovery } from '../command.discovery';

export class SlashCommandDiscovery extends CommandDiscovery<SlashCommandMeta> {
	private readonly reflector = new Reflector();

	public getDescription() {
		return this.meta.description;
	}

	public getRawOptions(): Record<string, OptionMeta> {
		return this.reflector.get(OPTIONS_METADATA, this.getHandler()) ?? {};
	}

	public getOptions() {
		return Object.values(this.getRawOptions());
	}

	public getGlobalId() {
		return `${this.getName()}`;
	}

	public isAppliable(
		interaction: APIInteraction
	): interaction is APIChatInputApplicationCommandInteraction {
		return (
			(isChatInputInteraction(interaction) || isAutocompleteInteraction(interaction)) &&
			this.getGlobalId() === interaction.data.name
		);
	}

	public override toJSON() {
		return {
			...this.meta,
			options: this.getOptions()
		};
	}
}
