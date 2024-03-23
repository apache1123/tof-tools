import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { EffectDefinition } from '../effects/effect-definition';

export interface AttackBuffDefinition extends EffectDefinition {
  value: number;
  elementalTypes: WeaponElementalType[];
}
