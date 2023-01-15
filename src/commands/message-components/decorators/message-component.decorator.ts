import { SetMetadata } from '@nestjs/common';

import { MESSAGE_COMPONENT_METADATA } from '../../../necord.constants';
import { MessageComponentDiscovery } from '../message-component.discovery';
import { MessageComponentMeta } from '../message-component.interface';

export const MessageComponent = (options: MessageComponentMeta) =>
	SetMetadata<string, MessageComponentDiscovery>(
		MESSAGE_COMPONENT_METADATA,
		new MessageComponentDiscovery(options)
	);
