import { SetMetadata } from '@nestjs/common';

import { MESSAGE_COMPONENT_METADATA } from '../../../necord.constants';
import { MessageComponentDiscovery, MessageComponentMeta } from '../message-component.discovery';

export const MessageComponent = (options: MessageComponentMeta) =>
	SetMetadata<string, MessageComponentDiscovery>(
		MESSAGE_COMPONENT_METADATA,
		new MessageComponentDiscovery(options)
	);
