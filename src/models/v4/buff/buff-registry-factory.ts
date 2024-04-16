import { commonBuffs } from '../../../constants/common-buffs';
import type { Loadout } from '../../loadout';
import { ActionTimeCalculator } from '../action/action-time-calculator';
import type { Relics } from '../relics/relics';
import { Buff } from './buff';
import type { BuffDefinition } from './buff-definition';
import { BuffRegistry } from './buff-registry';
import { BuffTimeline } from './buff-timeline';

export class BuffRegistryFactory {
  public static create(
    combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const {
      team: { weapons },
      simulacrumTrait,
    } = loadout;

    const buffs = [
      ...weapons.flatMap<BuffDefinition>((weapon) => weapon.definition.buffs),
      ...commonBuffs,
      ...(simulacrumTrait?.buffs ?? []),
      ...relics.passiveRelicBuffs,
    ].map((definition) => {
      const timeline = new BuffTimeline(combatDuration);
      return new Buff(
        definition,
        timeline,
        new ActionTimeCalculator(definition.endedBy, timeline)
      );
    });

    return new BuffRegistry(buffs);
  }
}
