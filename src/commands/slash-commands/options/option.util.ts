import {
	APIApplicationCommandOptionBase,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { OPTIONS_METADATA } from '../../../necord.constants';
import { OptionMeta } from '../slash-command.interface';

export function createOptionDecorator<
	T extends APIApplicationCommandOptionBase<ApplicationCommandOptionType>
>(type: ApplicationCommandOptionType) {
	return (data: Omit<T, 'type'>): PropertyDecorator => {
		return (target: any, propertyKey: string | symbol) => {
			Reflect.defineProperty(target, propertyKey, {
				value: undefined,
				writable: true,
				configurable: true
			});

			const meta: OptionMeta = {
				...data,
				type
			};

			Reflect.defineMetadata(OPTIONS_METADATA, meta, target, propertyKey);
		};
	};
}
