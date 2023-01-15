import { APIInteraction, InteractionType, APIModalSubmitInteraction } from 'discord-api-types/v10';

export function isModalSubmitInteraction(
	interaction: APIInteraction
): interaction is APIModalSubmitInteraction {
	return interaction.type === InteractionType.ModalSubmit;
}
