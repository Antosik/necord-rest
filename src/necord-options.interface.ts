import { ModuleMetadata, Type } from '@nestjs/common';
import { Snowflake } from 'discord-api-types/globals';

export interface NecordModuleOptions {
	token: string;
	publicKey: string;
	applicationId: string;
	development?: Snowflake[] | false;
	skipRegistration?: boolean;
}

export interface NecordOptionsFactory {
	createNecordOptions(): Promise<NecordModuleOptions> | NecordModuleOptions;
}

export interface NecordModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useExisting?: Type<NecordOptionsFactory>;
	useClass?: Type<NecordOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<NecordModuleOptions> | NecordModuleOptions;
	inject?: any[];
}
