import { createParamDecorator } from '@nestjs/common';
import { NecordExecutionContext } from '../../../context';
import {
	APIInteraction,
	APIMessageApplicationCommandInteractionDataResolved,
	APIUserInteractionDataResolved
} from 'discord-api-types/v10';
import {
	isMessageContextMenuInteraction,
	isUserContextMenuInteraction
} from '../context-menu.utils';

export const TargetMessage = createParamDecorator((_, context) => {
	const necordContext = NecordExecutionContext.create(context);
	const interaction = necordContext.getContext<APIInteraction>();

	if (!isMessageContextMenuInteraction(interaction)) return null;

	return (
		(interaction.data.resolved as APIMessageApplicationCommandInteractionDataResolved)
			.messages?.[interaction.data.target_id] ?? null
	);
});

export const TargetUser = createParamDecorator((_, context) => {
	const necordContext = NecordExecutionContext.create(context);
	const interaction = necordContext.getContext<APIInteraction>();

	if (!isUserContextMenuInteraction(interaction)) return null;

	return (
		(interaction.data.resolved as APIUserInteractionDataResolved).users?.[
			interaction.data.target_id
		] ?? null
	);
});

export const TargetMember = createParamDecorator((_, context) => {
	const necordContext = NecordExecutionContext.create(context);
	const interaction = necordContext.getContext<APIInteraction>();

	if (!isUserContextMenuInteraction(interaction)) return null;

	return (
		(interaction.data.resolved as APIUserInteractionDataResolved).members?.[
			interaction.data.target_id
		] ?? null
	);
});
