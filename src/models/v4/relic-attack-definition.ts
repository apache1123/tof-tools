import type { WeaponElementalType } from '../../constants/elemental-type';

export interface RelicAttackDefinition {
  id: string;
  displayName: string;
  /** DOT atk% multiplier per second */
  dotMultiplier: number;
  /** DOT duration in ms */
  dotDuration: number;
  /** The element type the attack deals */
  elementType: WeaponElementalType;
  /** in ms */
  cooldown: number;
  minStarRequirement: number;
  maxStarRequirement: number;
}
