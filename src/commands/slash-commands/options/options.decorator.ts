import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { APIInteraction } from 'discord-api-types/v10';

import { NecordExecutionContext } from '../../../context';
import { OPTIONS_METADATA } from '../../../necord.constants';
import { SlashCommandDiscovery } from '../slash-command.discovery';
import { isChatInputInteraction } from '../slash-command.utils';

export const Options = createParamDecorator(
	(_, context: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(context);
		const interaction = necordContext.getContext<APIInteraction>();
		const discovery = necordContext.getDiscovery() as SlashCommandDiscovery;

		if (!isChatInputInteraction(interaction)) return null;

		return Object.entries(discovery.getRawOptions()).reduce((acc, [parameter, option]) => {
			acc[parameter] = interaction.data.options.find(el => el.name === option.name);
			return acc;
		}, {});
	},
	[
		(target, propertyKey, parameterIndex) => {
			const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
			let { prototype } = paramTypes[parameterIndex];

			const options = {};

			do {
				Object.getOwnPropertyNames(prototype)
					.map(name => [name, Reflect.getMetadata(OPTIONS_METADATA, prototype, name)])
					.filter(([, meta]) => !!meta)
					.forEach(([name, meta]) => (options[name] ??= meta));
			} while (
				(prototype = Reflect.getPrototypeOf(prototype)) &&
				prototype !== Object.prototype
			);

			Reflect.defineMetadata(OPTIONS_METADATA, options, target[propertyKey]);
		}
	]
);

export const Opts = Options;
