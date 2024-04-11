import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import type { AttackDefinition } from '../attack/attack-definition';
import type { EventData } from '../event/event-data';

export interface AttackRequest extends EventData {
  weapon: Weapon;
  attackDefinition: AttackDefinition;
  time: number;
  elementalTypeOverwrite?: WeaponElementalType;
}
