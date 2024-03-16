import type { CommonWeaponDamageBuffId } from '../../../constants/common-weapon-damage-buffs';
import type { DamageBuffDefinition } from './damage-buff-definition';

export interface CommonWeaponDamageBuffDefinition extends DamageBuffDefinition {
  id: CommonWeaponDamageBuffId;
}
