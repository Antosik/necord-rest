import { APIInteraction } from 'discord-api-types/v10';

interface DiscoveredItem {
	class: any;
	handler?: (...args: any[]) => any;
}

export abstract class NecordBaseDiscovery<T = any> {
	protected discovery: DiscoveredItem;

	protected contextCallback: Function;

	public constructor(protected readonly meta: T) {}

	public abstract isAppliable(interaction: APIInteraction): boolean;

	public abstract getGlobalId(interaction: APIInteraction): string;

	public getClass() {
		return this.discovery.class;
	}

	public getHandler() {
		return this.discovery.handler;
	}

	public setDiscoveryMeta(meta: DiscoveredItem) {
		this.discovery ??= meta;
	}

	public setContextCallback(fn: Function) {
		this.contextCallback ??= fn;
	}

	public execute(interaction: APIInteraction) {
		return this.contextCallback(interaction, this);
	}

	public abstract toJSON(): Record<string, any>;
}
