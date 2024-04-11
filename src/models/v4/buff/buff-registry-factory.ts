import { commonBuffs } from '../../../constants/common-buffs';
import type { Loadout } from '../../loadout';
import type { Relics } from '../relics/relics';
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

    const buffTimelines = new Map(
      [
        ...weapons.flatMap<BuffDefinition>((weapon) => weapon.definition.buffs),
        ...commonBuffs,
        ...(simulacrumTrait?.buffs ?? []),
        ...relics.passiveRelicBuffs,
      ].map((buffDefinition) => {
        const timeline = new BuffTimeline(combatDuration);
        return [buffDefinition, timeline];
      })
    );

    return new BuffRegistry(buffTimelines);
  }
}
