import { isModalSubmitInteraction } from '../../../../src/commands/modals/modal.utils';
import { modalSubmitInteraction, pingInteraction } from '../../utils/interactions';

describe('Modals > Utils', () => {
	describe('isModalSubmitInteraction', () => {
		it('should be falsy if not modal interaction', () => {
			expect(isModalSubmitInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be truthy if modal interaction', () => {
			expect(isModalSubmitInteraction(modalSubmitInteraction)).toBeTruthy();
		});
	});
});
