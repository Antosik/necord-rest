import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NecordExecutionContext } from '../../../context';
import { APIInteraction } from 'discord-api-types/v10';
import { ModalDiscovery } from '..';

export const ModalParam = createParamDecorator((data, ctx: ExecutionContext) => {
	const necordContext = NecordExecutionContext.create(ctx);
	const interaction = necordContext.getContext<APIInteraction>();

	const discovery = necordContext.getDiscovery() as ModalDiscovery;
	if (!discovery.isAppliable(interaction)) return null;

	const match = discovery.matcher(interaction.data.custom_id);
	if (!match) return null;

	return data ? match.params[data] : match.params;
});
