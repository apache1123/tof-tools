import type { AttackBuffGroupLabel } from '../attack-buff/attack-buff-group';
import type { DamageBuffGroupLabel } from '../damage-buff/damage-buff-group';
import type { MiscellaneousBuffGroupLabel } from '../miscellaneous-buff/miscellaneous-buff-group';
import type { Effect } from './effect';

export type EffectGroupLabel =
  | AttackBuffGroupLabel
  | DamageBuffGroupLabel
  | MiscellaneousBuffGroupLabel
  | 'Weapon effects';

export class EffectGroup<T extends Effect> {
  public constructor(
    public label: string,
    public readonly items: Map<string, T>
  ) {}

  public getItem(effectId: string): T | undefined {
    return this.items.get(effectId);
  }
}
