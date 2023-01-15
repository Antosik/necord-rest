import {
	APIInteraction,
	ApplicationCommandType,
	InteractionType,
	APIChatInputApplicationCommandInteraction,
	APIApplicationCommandAutocompleteInteraction
} from 'discord-api-types/v10';

export function isChatInputInteraction(
	interaction: APIInteraction
): interaction is APIChatInputApplicationCommandInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		interaction.data.type === ApplicationCommandType.ChatInput
	);
}

export function isAutocompleteInteraction(
	interaction: APIInteraction
): interaction is APIApplicationCommandAutocompleteInteraction {
	return interaction.type === InteractionType.ApplicationCommandAutocomplete;
}
