import {
	APIApplicationCommandAttachmentOption,
	ApplicationCommandOptionType
} from 'discord-api-types/v10';
import { createOptionDecorator } from './option.util';

export const AttachmentOption = createOptionDecorator<APIApplicationCommandAttachmentOption>(
	ApplicationCommandOptionType.Attachment
);
