import { Injectable } from '@nestjs/common';

import { Modal } from '../../../src';
import { ModalMeta } from '../../../src/commands/modals/modal.interface';
import { MODAL_METADATA } from '../../../src/necord.constants';

describe('Modals > Modal Decorator', () => {
	const meta: Omit<ModalMeta, 'type'> = {
		customId: 'modal'
	};

	@Injectable()
	class DiscordService {
		@Modal(meta.customId)
		static menu() {
			return 'ok';
		}
	}

	it('should set modal meta', () => {
		const metaFromDecorator = Reflect.getMetadata(MODAL_METADATA, DiscordService.menu);
		expect(metaFromDecorator.meta).toEqual(meta);
	});
});
