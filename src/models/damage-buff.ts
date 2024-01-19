import type { WeaponElementalType } from '../constants/elemental-type';

export interface DamageBuff {
  value: number;
  /** The elemental types the damage buff applies to */
  elementalTypes: WeaponElementalType[];
  /** Damage buffs in the same category are additive. If they are not, they are multiplicative */
  category:
    | 'Relic passive'
    | 'Enemy debuff'
    | 'DMG buff category 1'
    | 'DMG buff category 2'
    | '[TEMP_UNKNOWN]';
  /** Always active whenever idle, combat. If not always active, the `duration` and `cooldown` will determine when the buff is active */
  isActivePassively: boolean;
  /** in ms */
  duration?: number;
  /** in ms */
  cooldown?: number;
}
