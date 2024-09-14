import type { WeaponElementalType } from '../../elemental-type';
import type { Buff } from './buff';

export interface AttackBuff extends Buff {
  elementalTypes: WeaponElementalType[];
}
