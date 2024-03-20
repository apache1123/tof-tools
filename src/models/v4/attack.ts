import type { WeaponElementalType } from '../../constants/elemental-type';
import type { Weapon } from '../weapon';
import type { AttackDefinition } from './attack-definition';

export interface Attack {
  weapon: Weapon;
  attackDefinition: AttackDefinition;
  /** The damage element of the attack. This is needed because it could be different from what's defined in the attack definition e.g. Nanyin's attack element is based off of the previous weapon */
  elementalType: WeaponElementalType;
  cooldown: number;
}
