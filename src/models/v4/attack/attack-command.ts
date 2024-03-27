import type { Weapon } from '../../weapon';
import type { AttackDefinition } from './attack-definition';

export interface AttackCommand {
  weapon: Weapon;
  attackDefinition: AttackDefinition;
}
