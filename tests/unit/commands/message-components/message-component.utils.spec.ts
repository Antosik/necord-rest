import {
	isButtonComponentInteraction,
	isChannelSelectComponentInteraction,
	isMessageComponentInteraction,
	isRoleSelectComponentInteraction,
	isStringSelectComponentInteraction,
	isUserSelectComponentInteraction
} from '../../../../src/commands/message-components/message-component.utils';
import {
	messageComponentButtonInteraction,
	messageComponentChannelSelectMenuInteraction,
	messageComponentMentionableSelectMenuInteraction,
	messageComponentRoleSelectMenuInteraction,
	messageComponentStringSelectMenuInteraction,
	messageComponentUserSelectMenuInteraction,
	pingInteraction
} from '../../utils/interactions';

describe('Message Components > Utils', () => {
	describe('isMessageComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isMessageComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be truthy if message component interaction', () => {
			expect(isMessageComponentInteraction(messageComponentButtonInteraction)).toBeTruthy();
		});
	});

	describe('isButtonComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isButtonComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not button component interaction', () => {
			expect(
				isButtonComponentInteraction(messageComponentUserSelectMenuInteraction)
			).toBeFalsy();
		});

		it('should be truthy if button component interaction', () => {
			expect(isButtonComponentInteraction(messageComponentButtonInteraction)).toBeTruthy();
		});
	});

	describe('isStringSelectComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isStringSelectComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not string select component interaction', () => {
			expect(
				isStringSelectComponentInteraction(messageComponentButtonInteraction)
			).toBeFalsy();
		});

		it('should be truthy if string select component interaction', () => {
			expect(
				isStringSelectComponentInteraction(messageComponentStringSelectMenuInteraction)
			).toBeTruthy();
		});
	});

	describe('isChannelSelectComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isChannelSelectComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not channel select component interaction', () => {
			expect(
				isChannelSelectComponentInteraction(messageComponentButtonInteraction)
			).toBeFalsy();
		});

		it('should be truthy if channel select component interaction', () => {
			expect(
				isChannelSelectComponentInteraction(messageComponentChannelSelectMenuInteraction)
			).toBeTruthy();
		});
	});

	describe('isUserSelectComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isUserSelectComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not user select component interaction', () => {
			expect(isUserSelectComponentInteraction(messageComponentButtonInteraction)).toBeFalsy();
		});

		it('should be truthy if user select component interaction', () => {
			expect(
				isUserSelectComponentInteraction(messageComponentUserSelectMenuInteraction)
			).toBeTruthy();
		});

		it('should be truthy if mentionable select component interaction', () => {
			expect(
				isUserSelectComponentInteraction(messageComponentMentionableSelectMenuInteraction)
			).toBeTruthy();
		});
	});

	describe('isRoleSelectComponentInteraction', () => {
		it('should be falsy if not message component interaction', () => {
			expect(isRoleSelectComponentInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not role select component interaction', () => {
			expect(
				isRoleSelectComponentInteraction(messageComponentStringSelectMenuInteraction)
			).toBeFalsy();
		});

		it('should be truthy if role select component interaction', () => {
			expect(
				isRoleSelectComponentInteraction(messageComponentRoleSelectMenuInteraction)
			).toBeTruthy();
		});

		it('should be truthy if mentionable select component interaction', () => {
			expect(
				isUserSelectComponentInteraction(messageComponentMentionableSelectMenuInteraction)
			).toBeTruthy();
		});
	});
});
