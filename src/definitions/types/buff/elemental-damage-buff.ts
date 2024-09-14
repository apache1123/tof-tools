import type { WeaponElementalType } from '../../elemental-type';
import type { Buff } from './buff';

export interface ElementalDamageBuff extends Buff {
  elementalTypes: WeaponElementalType[];
}
