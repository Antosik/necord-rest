import {
	isAutocompleteInteraction,
	isChatInputInteraction
} from '../../../src/commands/slash-commands/slash-command.utils';
import {
	applicationCommandAutocompleteInteraction,
	chatInputApplicationCommandInteraction,
	pingInteraction,
	userApplicationCommandInteraction
} from '../../utils/interactions';

describe('Slash Commands > Utils', () => {
	describe('isChatInputInteraction', () => {
		it('should be falsy if not application command interaction', () => {
			expect(isChatInputInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if application command but not chat input interaction', () => {
			expect(isChatInputInteraction(userApplicationCommandInteraction)).toBeFalsy();
		});

		it('should be truthy if chat input interaction', () => {
			expect(isChatInputInteraction(chatInputApplicationCommandInteraction)).toBeTruthy();
		});
	});

	describe('isAutocompleteInteraction', () => {
		it('should be falsy if not autocomplete interaction', () => {
			expect(isAutocompleteInteraction(pingInteraction)).toBeFalsy();
		});

		it('should be truthy if autocomplete interaction', () => {
			expect(
				isAutocompleteInteraction(applicationCommandAutocompleteInteraction)
			).toBeTruthy();
		});
	});
});
