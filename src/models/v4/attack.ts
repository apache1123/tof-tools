import type { Weapon } from '../weapon';
import type { AttackDefinition } from './attack-definition';

export interface Attack {
  weapon: Weapon;
  attackDefinition: AttackDefinition;
}
