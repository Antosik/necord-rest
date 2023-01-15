import { createNecordParamDecorator } from './params.util';
import { NecordParamType } from '../necord-paramtype.enum';

export const Context = createNecordParamDecorator(NecordParamType.CONTEXT);

export const Ctx = Context;
