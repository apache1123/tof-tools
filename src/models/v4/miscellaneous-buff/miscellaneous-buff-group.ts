import { EffectGroup } from '../effect/effect-group';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export type MiscellaneousBuffGroupLabel = 'Trait miscellaneous buffs';

export class MiscellaneousBuffGroup extends EffectGroup<MiscellaneousBuff> {
  public constructor(
    public label: MiscellaneousBuffGroupLabel,
    public readonly miscBuffs: Map<string, MiscellaneousBuff>
  ) {
    super(label, miscBuffs);
  }
}
