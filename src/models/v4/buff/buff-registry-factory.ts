import { commonBuffs } from '../../../constants/common-buffs';
import type { Loadout } from '../../loadout';
import { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import { BuffTimeline } from '../buff-timeline/buff-timeline';
import type { Relics } from '../relics/relics';
import { Buff } from './buff';
import type { BuffDefinition } from './buff-definition';
import { BuffRegistry } from './buff-registry';

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
      ...weapons.flatMap<BuffDefinition>((weapon) => weapon.buffs),
      ...commonBuffs,
      ...(simulacrumTrait?.buffs ?? []),
      ...relics.passiveRelicBuffs,
    ].map((definition) => {
      const timeline = new BuffTimeline(combatDuration);
      return new Buff(
        definition,
        timeline,
        new AbilityEventTimeCalculator(definition.endedBy, timeline)
      );
    });

    return new BuffRegistry(buffs);
  }
}
