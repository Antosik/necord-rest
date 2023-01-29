import {
	isContextMenuInteraction,
	isMessageContextMenuInteraction,
	isUserContextMenuInteraction
} from '../../../../src/commands/context-menus/context-menu.utils';
import {
	chatInputApplicationCommandInteraction,
	messageApplicationCommandInteraction,
	pingInteraction,
	userApplicationCommandInteraction
} from '../../../utils/interactions';

describe('Context Menus > Utils', () => {
	describe('isContextMenuInteraction', () => {
		it('should be falsy if not application command', () => {
			expect(isContextMenuInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not user or message command', () => {
			expect(isContextMenuInteraction(chatInputApplicationCommandInteraction)).toBeFalsy();
		});

		it('should be truthy user or message command', () => {
			expect(isContextMenuInteraction(userApplicationCommandInteraction)).toBeTruthy();
		});
	});

	describe('isMessageContextMenuInteraction', () => {
		it('should be falsy if not application command', () => {
			expect(isMessageContextMenuInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not message command', () => {
			expect(
				isMessageContextMenuInteraction(chatInputApplicationCommandInteraction)
			).toBeFalsy();
		});

		it('should be truthy user or message command', () => {
			expect(
				isMessageContextMenuInteraction(messageApplicationCommandInteraction)
			).toBeTruthy();
		});
	});

	describe('isUserContextMenuInteraction', () => {
		it('should be falsy if not application command', () => {
			expect(isUserContextMenuInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not user command', () => {
			expect(isContextMenuInteraction(chatInputApplicationCommandInteraction)).toBeFalsy();
		});

		it('should be truthy user or message command', () => {
			expect(isContextMenuInteraction(userApplicationCommandInteraction)).toBeTruthy();
		});
	});
});
