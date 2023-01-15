import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { APIApplicationCommandAutocompleteResponse, APIInteraction } from 'discord-api-types/v10';
import { Observable, of } from 'rxjs';

import { NecordExecutionContext } from '../../../context/necord-execution-context';
import { isAutocompleteInteraction } from '../slash-command.utils';

@Injectable()
export abstract class AutocompleteInterceptor implements NestInterceptor {
	public abstract transformOptions(
		interaction: APIInteraction
	):
		| APIApplicationCommandAutocompleteResponse
		| Promise<APIApplicationCommandAutocompleteResponse>;

	public async intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Promise<Observable<any>> {
		const necordContext = NecordExecutionContext.create(context);
		const interaction = necordContext.getContext<APIInteraction>();

		if (!isAutocompleteInteraction(interaction)) return next.handle();

		return of(this.transformOptions(interaction));
	}
}
