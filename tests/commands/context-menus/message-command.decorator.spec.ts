import { Injectable } from '@nestjs/common';
import { ApplicationCommandType } from 'discord-api-types/v10';

import { MessageCommand } from '../../../src';
import { ContextMenuMeta } from '../../../src/commands/context-menus/context-menu.interface';
import { CONTEXT_MENU_METADATA } from '../../../src/necord.constants';

describe('Context Menus > MessageCommand Decorator', () => {
	const meta: Omit<ContextMenuMeta, 'type'> = {
		name: 'Message'
	};

	@Injectable()
	class DiscordService {
		@MessageCommand(meta)
		static menu() {
			return 'ok';
		}
	}

	it('should set message command meta', () => {
		const metaFromDecorator = Reflect.getMetadata(CONTEXT_MENU_METADATA, DiscordService.menu);
		expect(metaFromDecorator.meta).toEqual({
			...meta,
			type: ApplicationCommandType.Message
		});
	});
});
