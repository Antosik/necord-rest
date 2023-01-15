import {
	APIApplicationCommandAutocompleteInteraction,
	APIApplicationCommandInteractionDataStringOption,
	APIChatInputApplicationCommandInteraction,
	APIContextMenuInteraction,
	APIMessageComponentButtonInteraction,
	APIMessageComponentSelectMenuInteraction,
	APIModalSubmitInteraction
} from 'discord-api-types/v10';

export type AutocompleteContext = APIApplicationCommandAutocompleteInteraction & {
	data: { options: APIApplicationCommandInteractionDataStringOption[] };
};

export type SlashCommandContext = APIChatInputApplicationCommandInteraction;

export type MessageCommandContext = APIContextMenuInteraction;

export type UserCommandContext = APIContextMenuInteraction;

export type ModalContext = APIModalSubmitInteraction;

export type ButtonContext = APIMessageComponentButtonInteraction;

export type StringSelectContext = APIMessageComponentSelectMenuInteraction;

export type ChannelSelectContext = APIMessageComponentSelectMenuInteraction;

export type RoleSelectContext = APIMessageComponentSelectMenuInteraction;

export type UserSelectContext = APIMessageComponentSelectMenuInteraction;

export type MentionableSelectContext = APIMessageComponentSelectMenuInteraction;
