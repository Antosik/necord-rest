import { ApplicationCommandType } from 'discord-api-types/v10';

import { ContextMenu } from './context-menu.decorator';
import { ContextMenuMeta } from '../context-menu.discovery';

export const MessageCommand = (options: Omit<ContextMenuMeta, 'type'>) =>
	ContextMenu({ type: ApplicationCommandType.Message, ...options });
