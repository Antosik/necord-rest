import { ComponentType } from 'discord-api-types/v10';

import { MessageComponentMeta } from '../../../../src/commands/message-components/message-component.interface';
import { MessageComponentDiscovery } from '../../../../src/commands/private';
import { messageComponentButtonInteraction, pingInteraction } from '../../utils/interactions';

describe('Message Components > Discovery', () => {
	const meta: MessageComponentMeta = {
		customId: 'Button',
		type: ComponentType.Button
	};

	it('should return meta type by getType', () => {
		expect(new MessageComponentDiscovery(meta).getType()).toEqual(meta.type);
	});

	it('should return meta customId by getCustomId', () => {
		expect(new MessageComponentDiscovery(meta).getCustomId()).toEqual(meta.customId);
	});

	it('should return composed id by getGlobalId', () => {
		expect(new MessageComponentDiscovery(meta).getGlobalId()).toEqual(
			`${meta.type}_${meta.customId}`
		);
	});

	it('should return meta by toJSON', () => {
		expect(new MessageComponentDiscovery(meta).toJSON()).toEqual(meta);
	});

	describe('isAppliable', () => {
		it('should be falsy if not message component interaction', () => {
			expect(new MessageComponentDiscovery(meta).isAppliable(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not correct global id', () => {
			expect(
				new MessageComponentDiscovery(meta).isAppliable(messageComponentButtonInteraction)
			).toBeFalsy();
		});

		it('should be truthy if message component with right id', () => {
			expect(
				new MessageComponentDiscovery({
					customId: '1',
					type: ComponentType.Button
				}).isAppliable(messageComponentButtonInteraction)
			).toBeTruthy();
		});
	});
});
