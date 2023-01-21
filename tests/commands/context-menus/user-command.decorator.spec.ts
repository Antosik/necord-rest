import { Injectable } from '@nestjs/common';
import { ApplicationCommandType } from 'discord-api-types/v10';

import { UserCommand } from '../../../src';
import { ContextMenuMeta } from '../../../src/commands/context-menus/context-menu.interface';
import { CONTEXT_MENU_METADATA } from '../../../src/necord.constants';

describe('Context Menus > UserCommand Decorator', () => {
	const meta: Omit<ContextMenuMeta, 'type'> = {
		name: 'User'
	};

	@Injectable()
	class DiscordService {
		@UserCommand(meta)
		static menu() {
			return 'ok';
		}
	}

	it('should set message command meta', () => {
		const metaFromDecorator = Reflect.getMetadata(CONTEXT_MENU_METADATA, DiscordService.menu);
		expect(metaFromDecorator.meta).toEqual({
			...meta,
			type: ApplicationCommandType.User
		});
	});
});
