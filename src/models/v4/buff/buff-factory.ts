import { commonBuffs } from '../../../constants/common-buffs';
import type { Loadout } from '../../loadout';
import type { Relics } from '../relics/relics';
import type { TickTracker } from '../tick/tick-tracker';
import { Buff } from './buff';
import type { BuffDefinition } from './buff-definition';
import { BuffTimeline } from './buff-timeline';

export class BuffFactory {
  public static createBuffs(
    combatDuration: number,
    loadout: Loadout,
    relics: Relics,
    tickTracker: TickTracker
  ): { buff: Buff; timeline: BuffTimeline }[] {
    return this.getDefinitions(loadout, relics).map((definition) => {
      const timeline = new BuffTimeline(definition, combatDuration);
      const buff = new Buff(definition, timeline, tickTracker);
      return { buff, timeline };
    });
  }

  public static getDefinitions(
    loadout: Loadout,
    relics: Relics
  ): BuffDefinition[] {
    const {
      team: { weapons },
      simulacrumTrait,
    } = loadout;

    return [
      ...weapons.flatMap((weapon) => weapon.buffs),
      ...weapons.flatMap((weapon) =>
        weapon.matrixSets
          .getMatrixSets()
          .flatMap((matrixSet) => matrixSet.buffs)
      ),
      ...commonBuffs,
      ...(simulacrumTrait?.buffs ?? []),
      ...relics.passiveRelicBuffs,
    ];
  }
}
