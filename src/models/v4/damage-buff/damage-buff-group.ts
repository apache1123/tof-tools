import { EffectGroup } from '../effect/effect-group';
import type { DamageBuff } from './damage-buff';

export type DamageBuffGroupLabel =
  | 'Weapon damage buffs'
  | 'Trait damage buffs'
  | 'Relic damage buffs';

export class DamageBuffGroup extends EffectGroup<DamageBuff> {
  public constructor(
    public label: DamageBuffGroupLabel,
    public readonly damageBuffs: Map<string, DamageBuff>
  ) {
    super(label, damageBuffs);
  }
}
