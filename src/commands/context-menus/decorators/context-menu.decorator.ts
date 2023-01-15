import { SetMetadata } from '@nestjs/common';

import { CONTEXT_MENU_METADATA } from '../../../necord.constants';
import { ContextMenuDiscovery } from '../context-menu.discovery';
import { ContextMenuMeta } from '../context-menu.interface';

export const ContextMenu = (options: ContextMenuMeta) =>
	SetMetadata<string, ContextMenuDiscovery>(
		CONTEXT_MENU_METADATA,
		new ContextMenuDiscovery(options)
	);
