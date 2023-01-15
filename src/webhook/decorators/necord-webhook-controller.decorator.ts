import { applyDecorators, HttpCode, UseGuards } from '@nestjs/common';

import { NecordInteractionSignatureGuard } from '../necord-signature.guard';

export const NecordWebhookController = () => {
	return applyDecorators(UseGuards(NecordInteractionSignatureGuard), HttpCode(200));
};
