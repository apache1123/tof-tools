import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { BuffDefinition } from './buff-definition';

export interface AttackBuffDefinition extends BuffDefinition {
  value: number;
  elementalTypes: WeaponElementalType[];
}
