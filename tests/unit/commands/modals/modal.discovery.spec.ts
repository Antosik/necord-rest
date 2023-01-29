import { ModalMeta } from '../../../../src/commands/modals/modal.interface';
import { ModalDiscovery } from '../../../../src/commands/private';
import { modalSubmitInteraction, pingInteraction } from '../../../utils/interactions';

describe('Modals > Discovery', () => {
	const meta: ModalMeta = {
		customId: 'Button'
	};

	it('should return meta customId by getCustomId', () => {
		expect(new ModalDiscovery(meta).getCustomId()).toEqual(meta.customId);
	});

	it('should return composed id by getGlobalId', () => {
		expect(new ModalDiscovery(meta).getGlobalId()).toEqual(meta.customId);
	});

	it('should return meta by toJSON', () => {
		expect(new ModalDiscovery(meta).toJSON()).toEqual(meta);
	});

	describe('isAppliable', () => {
		it('should be falsy if not modal interaction', () => {
			expect(new ModalDiscovery(meta).isAppliable(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not correct global id', () => {
			expect(new ModalDiscovery(meta).isAppliable(modalSubmitInteraction)).toBeFalsy();
		});

		it('should be truthy if modal with right id', () => {
			expect(
				new ModalDiscovery({
					customId: '1'
				}).isAppliable(modalSubmitInteraction)
			).toBeTruthy();
		});
	});
});
