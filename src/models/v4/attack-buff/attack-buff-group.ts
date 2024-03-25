import { EffectGroup } from '../effect/effect-group';
import type { AttackBuff } from './attack-buff';

export type AttackBuffGroupLabel = 'Weapon attack buffs' | 'Trait attack buffs';

export class AttackBuffGroup extends EffectGroup<AttackBuff> {
  public constructor(
    public label: AttackBuffGroupLabel,
    public readonly attackBuffs: Map<string, AttackBuff>
  ) {
    super(label, attackBuffs);
  }
}
