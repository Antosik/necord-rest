import { Snowflake } from 'discord-api-types/globals';

import { BaseApplicationCommandData } from './command.interface';
import { NecordBaseDiscovery } from '../context/necord-base.discovery';

export abstract class CommandDiscovery<
	T extends BaseApplicationCommandData = BaseApplicationCommandData
> extends NecordBaseDiscovery<T> {
	public getName() {
		return this.meta.name;
	}

	public getGuilds(): Snowflake[] {
		return this.meta.guilds;
	}
}
