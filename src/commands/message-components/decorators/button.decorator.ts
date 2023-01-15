import { ComponentType } from 'discord-api-types/v10';
import { MessageComponent } from './message-component.decorator';

export const Button = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.Button });
