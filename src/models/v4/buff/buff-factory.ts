import { commonBuffs } from '../../../constants/common-buffs';
import type { Loadout } from '../../loadout';
import { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import type { Relics } from '../relics/relics';
import type { TickTracker } from '../tick-tracker';
import { Timeline } from '../timeline/timeline';
import { Buff } from './buff';
import type { BuffDefinition } from './buff-definition';
import type { BuffEvent } from './buff-event';

export class BuffFactory {
  public static createBuffs(
    combatDuration: number,
    loadout: Loadout,
    relics: Relics,
    tickTracker: TickTracker
  ): Buff[] {
    return this.getDefinitions(loadout, relics).map((definition) => {
      const timeline = new Timeline<BuffEvent>(combatDuration);
      return new Buff(
        definition,
        timeline,
        tickTracker,
        new AbilityEventTimeCalculator(definition.endedBy, timeline)
      );
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
