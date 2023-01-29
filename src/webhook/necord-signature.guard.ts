import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Inject,
	InternalServerErrorException
} from '@nestjs/common';
import { sign } from 'tweetnacl';

import { NecordModuleOptions } from '../necord-options.interface';
import { NECORD_MODULE_OPTIONS } from '../necord.constants';

@Injectable()
export class NecordInteractionSignatureGuard implements CanActivate {
	constructor(@Inject(NECORD_MODULE_OPTIONS) private readonly options: NecordModuleOptions) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const { headers, rawBody } = context.switchToHttp().getRequest();
		if (!rawBody) {
			throw new InternalServerErrorException(
				`Missing raw body in request. Ensure that 'rawBody' option is set when initializing Nest application.`
			);
		}

		const signature = headers['x-signature-ed25519'] as string;
		if (!signature) {
			throw new UnauthorizedException('empty request signature');
		}

		const timestamp = headers['x-signature-timestamp'] as string;
		if (!timestamp) {
			throw new UnauthorizedException('empty request signature timestamp');
		}

		try {
			const isValidRequest = sign.detached.verify(
				Buffer.from(timestamp + rawBody.toString()),
				Buffer.from(signature, 'hex'),
				Buffer.from(this.options.publicKey, 'hex')
			);
			if (!isValidRequest) {
				throw new UnauthorizedException('invalid request signature');
			}
		} catch (err) {
			throw new UnauthorizedException(err);
		}

		return true;
	}
}
