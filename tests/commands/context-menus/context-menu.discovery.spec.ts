import { ApplicationCommandType } from 'discord-api-types/v10';

import { ContextMenuMeta } from '../../../src/commands/context-menus/context-menu.interface';
import { ContextMenuDiscovery } from '../../../src/commands/private';
import { pingInteraction, userApplicationCommandInteraction } from '../../utils/interactions';

describe('Context Menus > Discovery', () => {
	const meta: ContextMenuMeta = {
		name: 'Menu',
		type: ApplicationCommandType.Message
	};

	it('should return meta type by getType', () => {
		expect(new ContextMenuDiscovery(meta).getType()).toEqual(meta.type);
	});

	it('should return composed id by getGlobalId', () => {
		expect(new ContextMenuDiscovery(meta).getGlobalId()).toEqual(`${meta.type}:${meta.name}`);
	});

	it('should return meta by toJSON', () => {
		expect(new ContextMenuDiscovery(meta).toJSON()).toEqual(meta);
	});

	describe('isAppliable', () => {
		it('should be falsy if not context menu interaction', () => {
			expect(new ContextMenuDiscovery(meta).isAppliable(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not correct global id', () => {
			expect(
				new ContextMenuDiscovery(meta).isAppliable(userApplicationCommandInteraction)
			).toBeFalsy();
		});

		it('should be truthy if context menu with right id', () => {
			expect(
				new ContextMenuDiscovery({
					name: 'user',
					type: ApplicationCommandType.User
				}).isAppliable(userApplicationCommandInteraction)
			).toBeTruthy();
		});
	});
});
