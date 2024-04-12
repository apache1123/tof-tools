import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { EventData } from '../event/event-data';

export interface AttackRequest extends EventData {
  elementalTypeOverwrite?: WeaponElementalType;
}
