import {
	APIApplicationCommandOptionBase,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';

import { createOptionDecorator } from '../../../../../src/commands/slash-commands/options/option.util';
import { OPTIONS_METADATA } from '../../../../../src/necord.constants';

describe('Slash Commands > Options > createOptionDecorator', () => {
	it('should set option meta', () => {
		const type = ApplicationCommandOptionType.Attachment;
		const meta: Omit<APIApplicationCommandOptionBase<ApplicationCommandOptionType>, 'type'> = {
			name: 'option',
			description: 'Option description'
		};
		const optionDecorator = createOptionDecorator(type);

		class MessageDto {
			@optionDecorator(meta)
			data: string;
		}

		const metaFromDecorator = Reflect.getMetadata(
			OPTIONS_METADATA,
			MessageDto.prototype,
			'data'
		);
		expect(metaFromDecorator).toEqual({
			...meta,
			type
		});
	});
});
