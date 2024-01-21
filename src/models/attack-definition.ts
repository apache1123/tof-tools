import type { AttackType } from '../constants/attack-type';
import type { AttackElementalType } from '../constants/elemental-type';

export interface AttackDefinition {
  id: string;
  displayName: string;
  description?: string;

  /** the "x%" part of "dealing damage equal to x% of ATK plus y to target" */
  multiplierDamage: number;
  /** the "y" part of "dealing damage equal to x% of ATK plus y to target" */
  // TODO: for weapon attacks, this varies based on skill level
  flatDamage: number;

  /** in ms */
  duration: number;
  /** in ms */
  cooldown: number;

  elementalType: AttackElementalType;
  type: AttackType;
  charge: number;
}
