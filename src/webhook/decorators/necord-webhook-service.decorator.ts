import { SetMetadata } from '@nestjs/common';

import { NECORD_WEBHOOK_SERVICE } from '../../necord.constants';

export const NecordWebhookService = () => SetMetadata(NECORD_WEBHOOK_SERVICE, true);
