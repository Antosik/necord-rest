import { createParamDecorator } from '@nestjs/common';
import { APIInteraction } from 'discord-api-types/v10';

import { NecordExecutionContext } from '../../../context';
import { isModalSubmitInteraction } from '../modals.utils';

export const Fields = createParamDecorator((customId, context) => {
	const necordContext = NecordExecutionContext.create(context);

	const interaction = necordContext.getContext<APIInteraction>();
	if (!isModalSubmitInteraction(interaction)) return null;

	const components = interaction.data.components.map(el => el.components).flat();
	return customId ? components.find(el => el.custom_id === customId).value : components;
});
