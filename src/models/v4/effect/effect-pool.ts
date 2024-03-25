import type { AttackBuffGroup } from '../attack-buff/attack-buff-group';
import type { DamageBuffGroup } from '../damage-buff/damage-buff-group';
import type { MiscellaneousBuffGroup } from '../miscellaneous-buff/miscellaneous-buff-group';
import type { Effect } from './effect';
import type { EffectGroup, EffectGroupLabel } from './effect-group';

export class EffectPool {
  public constructor(
    public readonly attackBuffGroups: AttackBuffGroup[],
    public readonly damageBuffGroups: DamageBuffGroup[],
    public readonly miscBuffGroups: MiscellaneousBuffGroup[],
    public readonly otherEffectGroups: EffectGroup<Effect>[]
  ) {}

  public get allEffectGroups(): EffectGroup<Effect>[] {
    return [
      ...this.attackBuffGroups,
      ...this.damageBuffGroups,
      ...this.miscBuffGroups,
      ...this.otherEffectGroups,
    ];
  }

  public getEffect(effectId: string): Effect | undefined {
    for (const effectGroup of this.allEffectGroups) {
      const effect = effectGroup.getItem(effectId);
      if (effect) {
        return effect;
      }
    }
  }

  public getEffectGroup(label: EffectGroupLabel) {
    return this.allEffectGroups.find(
      (effectGroup) => effectGroup.label === label
    );
  }
}
