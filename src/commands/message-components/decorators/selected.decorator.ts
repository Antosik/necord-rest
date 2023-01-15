import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
	APIInteraction,
	APIInteractionDataResolvedChannel,
	APIInteractionDataResolvedGuildMember,
	APIMessageChannelSelectInteractionData,
	APIMessageRoleSelectInteractionData,
	APIMessageUserSelectInteractionData,
	APIRole,
	APIUser
} from 'discord-api-types/v10';

import { NecordExecutionContext } from '../../../context/necord-execution-context';
import {
	isChannelSelectComponentInteraction,
	isRoleSelectComponentInteraction,
	isStringSelectComponentInteraction,
	isUserSelectComponentInteraction
} from '../message-component.utils';

export const SelectedStrings = createParamDecorator<any, any, string[]>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		return isStringSelectComponentInteraction(interaction) ? interaction.data.values : [];
	}
);

export const SelectedChannels = createParamDecorator<any, any, APIInteractionDataResolvedChannel[]>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isChannelSelectComponentInteraction(interaction)) {
			return [];
		}

		const data = interaction.data as APIMessageChannelSelectInteractionData;
		return data?.resolved?.channels ? Object.values(data?.resolved?.channels) : [];
	}
);

export const SelectedUsers = createParamDecorator<any, any, APIUser[]>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isUserSelectComponentInteraction(interaction)) {
			return [];
		}

		const data = interaction.data as APIMessageUserSelectInteractionData;
		return data?.resolved?.users ? Object.values(data?.resolved?.users) : [];
	}
);

export const SelectedMembers = createParamDecorator<
	any,
	any,
	APIInteractionDataResolvedGuildMember[]
>((_, ctx: ExecutionContext) => {
	const necordContext = NecordExecutionContext.create(ctx);
	const interaction = necordContext.getContext<APIInteraction>();

	if (!isUserSelectComponentInteraction(interaction)) {
		return [];
	}

	const data = interaction.data as APIMessageUserSelectInteractionData;
	return data?.resolved?.members ? Object.values(data?.resolved?.members) : [];
});

export const SelectedRoles = createParamDecorator<any, any, APIRole[]>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isRoleSelectComponentInteraction(interaction)) {
			return [];
		}

		const data = interaction.data as APIMessageRoleSelectInteractionData;
		return data?.resolved?.roles ? Object.values(data?.resolved?.roles) : [];
	}
);
