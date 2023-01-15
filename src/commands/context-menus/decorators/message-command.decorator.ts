import { ApplicationCommandType } from 'discord-api-types/v10';
import { ContextMenuMeta } from '../context-menu.discovery';
import { ContextMenu } from './context-menu.decorator';

export const MessageCommand = (options: Omit<ContextMenuMeta, 'type'>) =>
	ContextMenu({ type: ApplicationCommandType.Message, ...options });
