import { Injectable } from '@nestjs/common';
import { ComponentType } from 'discord-api-types/v10';

import {
	ChannelSelect,
	MentionableSelect,
	RoleSelect,
	StringSelect,
	UserSelect
} from '../../../../src';
import { MessageComponentMeta } from '../../../../src/commands/message-components/message-component.interface';
import { MESSAGE_COMPONENT_METADATA } from '../../../../src/necord.constants';

describe('Message Components > Select Menu Decorator', () => {
	describe('StringSelect', () => {
		const meta: Omit<MessageComponentMeta, 'type'> = {
			customId: 'stringSelect'
		};

		@Injectable()
		class DiscordService {
			@StringSelect(meta.customId)
			static menu() {
				return 'ok';
			}
		}

		it('should set message command meta', () => {
			const metaFromDecorator = Reflect.getMetadata(
				MESSAGE_COMPONENT_METADATA,
				DiscordService.menu
			);
			expect(metaFromDecorator.meta).toEqual({
				...meta,
				type: ComponentType.StringSelect
			});
		});
	});

	describe('ChannelSelect', () => {
		const meta: Omit<MessageComponentMeta, 'type'> = {
			customId: 'channelSelect'
		};

		@Injectable()
		class DiscordService {
			@ChannelSelect(meta.customId)
			static menu() {
				return 'ok';
			}
		}

		it('should set message command meta', () => {
			const metaFromDecorator = Reflect.getMetadata(
				MESSAGE_COMPONENT_METADATA,
				DiscordService.menu
			);
			expect(metaFromDecorator.meta).toEqual({
				...meta,
				type: ComponentType.ChannelSelect
			});
		});
	});

	describe('UserSelect', () => {
		const meta: Omit<MessageComponentMeta, 'type'> = {
			customId: 'userSelect'
		};

		@Injectable()
		class DiscordService {
			@UserSelect(meta.customId)
			static menu() {
				return 'ok';
			}
		}

		it('should set message command meta', () => {
			const metaFromDecorator = Reflect.getMetadata(
				MESSAGE_COMPONENT_METADATA,
				DiscordService.menu
			);
			expect(metaFromDecorator.meta).toEqual({
				...meta,
				type: ComponentType.UserSelect
			});
		});
	});

	describe('MentionableSelect', () => {
		const meta: Omit<MessageComponentMeta, 'type'> = {
			customId: 'mentionableSelect'
		};

		@Injectable()
		class DiscordService {
			@MentionableSelect(meta.customId)
			static menu() {
				return 'ok';
			}
		}

		it('should set message command meta', () => {
			const metaFromDecorator = Reflect.getMetadata(
				MESSAGE_COMPONENT_METADATA,
				DiscordService.menu
			);
			expect(metaFromDecorator.meta).toEqual({
				...meta,
				type: ComponentType.MentionableSelect
			});
		});
	});

	describe('RoleSelect', () => {
		const meta: Omit<MessageComponentMeta, 'type'> = {
			customId: 'roleSelect'
		};

		@Injectable()
		class DiscordService {
			@RoleSelect(meta.customId)
			static menu() {
				return 'ok';
			}
		}

		it('should set message command meta', () => {
			const metaFromDecorator = Reflect.getMetadata(
				MESSAGE_COMPONENT_METADATA,
				DiscordService.menu
			);
			expect(metaFromDecorator.meta).toEqual({
				...meta,
				type: ComponentType.RoleSelect
			});
		});
	});
});
