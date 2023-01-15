import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ArgumentsHost } from '@nestjs/common';
import { NecordContextType } from './necord-execution-context';
import { NecordBaseDiscovery } from '../context';

export class NecordArgumentsHost extends ExecutionContextHost {
	public static create(context: ArgumentsHost): NecordArgumentsHost {
		const type = context.getType();
		const necContext = new NecordArgumentsHost(context.getArgs());
		necContext.setType(type);
		return necContext;
	}

	public getType<TContext extends string = NecordContextType>(): TContext {
		return super.getType();
	}

	public getContext<T>(): T {
		return this.getArgByIndex(0);
	}

	public getDiscovery(): NecordBaseDiscovery {
		return this.getArgByIndex(1);
	}
}
