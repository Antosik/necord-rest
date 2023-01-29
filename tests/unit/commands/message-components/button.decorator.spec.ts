import { Injectable } from '@nestjs/common';
import { ComponentType } from 'discord-api-types/v10';

import { Button } from '../../../../src';
import { MessageComponentMeta } from '../../../../src/commands/message-components/message-component.interface';
import { MESSAGE_COMPONENT_METADATA } from '../../../../src/necord.constants';

describe('Message Components > Button Decorator', () => {
	const meta: Omit<MessageComponentMeta, 'type'> = {
		customId: 'button'
	};

	@Injectable()
	class DiscordService {
		@Button(meta.customId)
		static menu() {
			return 'ok';
		}
	}

	it('should set message command meta', () => {
		const metaFromDecorator = Reflect.getMetadata(
			MESSAGE_COMPONENT_METADATA,
			DiscordService.menu
		);
		expect(metaFromDecorator.meta).toEqual({
			...meta,
			type: ComponentType.Button
		});
	});
});
