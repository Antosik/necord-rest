import { Permissions, Snowflake } from 'discord-api-types/globals';
import { LocalizationMap } from 'discord-api-types/v10';
import { NecordBaseDiscovery } from '../context';

export interface BaseApplicationCommandData {
	name: string;
	name_localizations?: LocalizationMap;
	dm_permission?: boolean;
	default_member_permissions?: Permissions | null;
	nsfw?: boolean;
	guilds?: Snowflake[];
}

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
