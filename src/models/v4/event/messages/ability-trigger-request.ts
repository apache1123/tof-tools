import type { AbilityId } from '../../ability/ability-id';
import type { Message } from '../message';

export interface AbilityTriggerRequest extends Message {
  id: AbilityId;
}
