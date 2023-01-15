import { SetMetadata } from '@nestjs/common';

import { MODAL_METADATA } from '../../../necord.constants';
import { ModalDiscovery } from '../modal.discovery';

export const Modal = (customId: string): MethodDecorator =>
	SetMetadata<string, ModalDiscovery>(MODAL_METADATA, new ModalDiscovery({ customId }));
