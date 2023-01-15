import {
	APIInteraction,
	InteractionType,
	APIMessageComponentInteraction,
	ComponentType,
	APIMessageComponentButtonInteraction,
	APIMessageComponentSelectMenuInteraction
} from 'discord-api-types/v10';

export function isMessageComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentInteraction {
	return interaction.type === InteractionType.MessageComponent;
}

export function isButtonComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentButtonInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.Button
	);
}

export function isStringSelectComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.StringSelect
	);
}

export function isChannelSelectComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		interaction.data.component_type === ComponentType.ChannelSelect
	);
}

export function isUserSelectComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		(interaction.data.component_type === ComponentType.UserSelect ||
			interaction.data.component_type === ComponentType.MentionableSelect)
	);
}

export function isRoleSelectComponentInteraction(
	interaction: APIInteraction
): interaction is APIMessageComponentSelectMenuInteraction {
	return (
		interaction.type === InteractionType.MessageComponent &&
		(interaction.data.component_type === ComponentType.RoleSelect ||
			interaction.data.component_type === ComponentType.MentionableSelect)
	);
}
