import { SlashCommandDiscovery } from '../../../src/commands/private';
import { SlashCommandMeta } from '../../../src/commands/slash-commands/slash-command.interface';
import { chatInputApplicationCommandInteraction, pingInteraction } from '../../utils/interactions';

describe('Slash Commands > Discovery', () => {
	const meta: SlashCommandMeta = {
		name: 'time',
		description: 'Returns current time',
		guilds: []
	};

	it('should return composed id by getGlobalId', () => {
		expect(new SlashCommandDiscovery(meta).getGlobalId()).toEqual(meta.name);
	});

	describe('isAppliable', () => {
		it('should be falsy if not chat input or autocomplete interaction', () => {
			expect(new SlashCommandDiscovery(meta).isAppliable(pingInteraction)).toBeFalsy();
		});

		it('should be falsy if not correct global id', () => {
			expect(
				new SlashCommandDiscovery(meta).isAppliable(chatInputApplicationCommandInteraction)
			).toBeFalsy();
		});

		it('should be truthy if modal with right id', () => {
			expect(
				new SlashCommandDiscovery({
					name: 'chat',
					description: 'random description'
				}).isAppliable(chatInputApplicationCommandInteraction)
			).toBeTruthy();
		});
	});
});
