import { Snowflake, LocalizationMap } from 'discord-api-types/v10';

export interface BaseApplicationCommandData {
	name: string;
	name_localizations?: LocalizationMap;
	dm_permission?: boolean;
	default_member_permissions?: Permissions | null;
	nsfw?: boolean;
	guilds?: Snowflake[];
}
