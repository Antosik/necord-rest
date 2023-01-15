import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
	APIInteraction,
	APIInteractionDataResolved,
	APIMessageChannelSelectInteractionData,
	APIMessageRoleSelectInteractionData,
	APIMessageUserSelectInteractionData
} from 'discord-api-types/v10';
import { NecordExecutionContext } from '../../../context';
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

export type ISelectedChannels = APIInteractionDataResolved['channels'];
export const SelectedChannels = createParamDecorator<any, any, ISelectedChannels>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isChannelSelectComponentInteraction(interaction)) {
			return {};
		}

		return (
			(interaction.data as APIMessageChannelSelectInteractionData)?.resolved?.channels ?? {}
		);
	}
);

export type ISelectedUsers = APIInteractionDataResolved['users'];
export const SelectedUsers = createParamDecorator<any, any, ISelectedUsers>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isUserSelectComponentInteraction(interaction)) {
			return {};
		}

		return (interaction.data as APIMessageUserSelectInteractionData)?.resolved?.users ?? {};
	}
);

export type ISelectedMembers = APIInteractionDataResolved['members'];
export const SelectedMembers = createParamDecorator<any, any, ISelectedMembers>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isUserSelectComponentInteraction(interaction)) {
			return {};
		}

		return (interaction.data as APIMessageUserSelectInteractionData)?.resolved?.members ?? {};
	}
);

export type ISelectedRoles = APIInteractionDataResolved['roles'];
export const SelectedRoles = createParamDecorator<any, any, ISelectedRoles>(
	(_, ctx: ExecutionContext) => {
		const necordContext = NecordExecutionContext.create(ctx);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isRoleSelectComponentInteraction(interaction)) {
			return {};
		}

		return (interaction.data as APIMessageRoleSelectInteractionData)?.resolved?.roles ?? {};
	}
);
