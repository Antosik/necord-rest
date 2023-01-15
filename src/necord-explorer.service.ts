import { REST } from '@discordjs/rest';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { STATIC_CONTEXT } from '@nestjs/core/injector/constants';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import {
	APIInteraction,
	APIInteractionResponse,
	InteractionResponseType,
	InteractionType,
	Routes
} from 'discord-api-types/v10';

import {
	CommandDiscovery,
	ContextMenuDiscovery,
	MessageComponentDiscovery,
	ModalDiscovery,
	SlashCommandDiscovery
} from './commands/private';
import { NecordBaseDiscovery, NecordContextType, NecordParamsFactory } from './context/private';
import { NecordModuleOptions } from './necord-options.interface';
import {
	NECORD_MODULE_OPTIONS,
	NECORD_WEBHOOK_SERVICE,
	CONTEXT_MENU_METADATA,
	MESSAGE_COMPONENT_METADATA,
	MODAL_METADATA,
	SLASH_COMMAND_METADATA
} from './necord.constants';
import { wait } from './utils';

@Injectable()
export class ExplorerService implements OnModuleInit {
	private readonly logger = new Logger(ExplorerService.name);
	private readonly necordParamsFactory = new NecordParamsFactory();

	constructor(
		@Inject(NECORD_MODULE_OPTIONS)
		private readonly necordOptions: NecordModuleOptions,
		private readonly discoveryService: DiscoveryService,
		private readonly metadataScanner: MetadataScanner,
		private readonly externalContextCreator: ExternalContextCreator,
		private readonly reflector: Reflector
	) {}

	async onModuleInit() {
		const necordWebhookService = await this.discoveryService.getProviders().find(provider => {
			const instance =
				!provider.metatype || provider.inject
					? provider.instance?.constructor
					: provider.metatype;
			if (!instance) {
				return false;
			}
			return Boolean(this.reflector.get(NECORD_WEBHOOK_SERVICE, instance));
		})?.instance;

		if (!necordWebhookService) {
			throw new Error('Could not find instance of Necord Webhook Service');
		}

		const applicationCommands: CommandDiscovery[] = [
			...this.exploreByKey<ContextMenuDiscovery>(CONTEXT_MENU_METADATA),
			...this.exploreByKey<SlashCommandDiscovery>(SLASH_COMMAND_METADATA)
		];

		const allCommands: NecordBaseDiscovery[] = [
			...applicationCommands,
			...this.exploreByKey<MessageComponentDiscovery>(MESSAGE_COMPONENT_METADATA),
			...this.exploreByKey<ModalDiscovery>(MODAL_METADATA)
		];

		const handleWebhook = async (
			webhookEvent: APIInteraction
		): Promise<APIInteractionResponse> | null => {
			if (webhookEvent.type === InteractionType.Ping) {
				return {
					type: InteractionResponseType.Pong
				};
			}

			return allCommands
				.find(command => command.isAppliable(webhookEvent))
				?.execute(webhookEvent);
		};

		necordWebhookService.handleWebhook = handleWebhook;

		if (this.necordOptions.skipRegistration) return;

		const rest = new REST({ version: '10' }).setToken(this.necordOptions.token);
		const globalCommands = [];
		const guildToCommandsMap = new Map<string, Array<CommandDiscovery>>();

		for (const command of applicationCommands) {
			const guilds = Array.isArray(this.necordOptions.development)
				? this.necordOptions.development
				: command.getGuilds() ?? [];

			if (!guilds.length) {
				globalCommands.push(command);
				continue;
			}

			for (const guildId of guilds) {
				const visitedCommands = guildToCommandsMap.get(guildId) ?? [];
				guildToCommandsMap.set(guildId, visitedCommands.concat(command));
			}
		}

		this.logger.log(`Started refreshing application commands.`);
		await this.registerGlobalCommands(rest, globalCommands);
		await wait();
		await this.registerGuildsCommands(rest, guildToCommandsMap);
		this.logger.log(`Successfully reloaded application commands.`);
	}

	private get wrappers() {
		return this.discoveryService.getProviders().filter(wrapper => {
			const { instance } = wrapper;
			const prototype = instance ? Object.getPrototypeOf(instance) : null;

			return instance && prototype && wrapper.isDependencyTreeStatic();
		});
	}

	private exploreByKey<T extends NecordBaseDiscovery>(metadataKey: string): T[] {
		return this.flatMap(wrapper => this.filterProperties(wrapper, metadataKey));
	}

	private flatMap<T>(callback: (wrapper: InstanceWrapper) => T[]) {
		return this.wrappers.flatMap(callback).filter(Boolean);
	}

	private filterProperties<T extends NecordBaseDiscovery>(
		{ instance }: InstanceWrapper,
		metadataKey: string
	) {
		const prototype = Object.getPrototypeOf(instance);

		return this.metadataScanner.scanFromPrototype(instance, prototype, methodName => {
			const item = Reflect.getMetadata(metadataKey, instance[methodName]) as T;
			if (!item) return;

			item.setDiscoveryMeta({ class: instance.constructor, handler: instance[methodName] });
			item.setContextCallback(this.createContextCallback(instance, prototype, methodName));

			return item;
		});
	}

	private createContextCallback(instance: object, prototype: unknown, methodName: string) {
		return this.externalContextCreator.create<Record<number, ParamMetadata>, NecordContextType>(
			instance,
			prototype[methodName],
			methodName,
			ROUTE_ARGS_METADATA,
			this.necordParamsFactory,
			STATIC_CONTEXT,
			undefined,
			{ guards: true, filters: true, interceptors: true },
			'necord'
		);
	}

	private async registerGlobalCommands(api: REST, commands: CommandDiscovery[]) {
		return api.put(Routes.applicationCommands(this.necordOptions.applicationId), {
			body: commands.map(el => el.toJSON())
		});
	}

	private async registerGuildsCommands(
		api: REST,
		guildToCommandsMap: Map<string, CommandDiscovery[]>
	) {
		for (const [guildId, commands] of guildToCommandsMap.entries()) {
			await api.put(
				Routes.applicationGuildCommands(this.necordOptions.applicationId, guildId),
				{
					body: commands.map(el => el.toJSON())
				}
			);
			await wait();
		}
	}
}
