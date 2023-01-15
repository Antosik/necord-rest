import { SetMetadata } from '@nestjs/common';

import { CONTEXT_MENU_METADATA } from '../../../necord.constants';
import { ContextMenuDiscovery, ContextMenuMeta } from '../context-menu.discovery';

export const ContextMenu = (options: ContextMenuMeta) =>
	SetMetadata<string, ContextMenuDiscovery>(
		CONTEXT_MENU_METADATA,
		new ContextMenuDiscovery(options)
	);
