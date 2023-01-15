import { applyDecorators, HttpCode, UseGuards } from '@nestjs/common';
import { NecordInteractionSignatureGuard } from '../guards/necord-signature.guards';

export const NecordWebhookController = () => {
	return applyDecorators(UseGuards(NecordInteractionSignatureGuard), HttpCode(200));
};
