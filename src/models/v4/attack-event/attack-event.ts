import type { Attack } from '../attack/attack';
import type { EventData } from '../event/event-data';

export interface AttackEvent extends EventData {
  attack: Attack;
}
