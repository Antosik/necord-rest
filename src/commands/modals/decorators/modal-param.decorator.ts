import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { APIInteraction } from 'discord-api-types/v10';

import { NecordExecutionContext } from '../../../context/necord-execution-context';
import { ModalDiscovery } from '../modal.discovery';

export const ModalParam = createParamDecorator((data, ctx: ExecutionContext) => {
	const necordContext = NecordExecutionContext.create(ctx);
	const interaction = necordContext.getContext<APIInteraction>();

	const discovery = necordContext.getDiscovery() as ModalDiscovery;
	if (!discovery.isAppliable(interaction)) return null;

	const match = discovery.matcher(interaction.data.custom_id);
	if (!match) return null;

	return data ? match.params[data] : match.params;
});
