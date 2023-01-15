import {
	APIInteraction,
	APIContextMenuInteraction,
	ApplicationCommandType,
	InteractionType
} from 'discord-api-types/v10';

export function isContextMenuInteraction(
	interaction: APIInteraction
): interaction is APIContextMenuInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		[ApplicationCommandType.User, ApplicationCommandType.Message].includes(
			interaction.data.type
		)
	);
}

export function isMessageContextMenuInteraction(
	interaction: APIInteraction
): interaction is APIContextMenuInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		ApplicationCommandType.Message === interaction.data.type
	);
}

export function isUserContextMenuInteraction(
	interaction: APIInteraction
): interaction is APIContextMenuInteraction {
	return (
		interaction.type === InteractionType.ApplicationCommand &&
		ApplicationCommandType.User === interaction.data.type
	);
}
