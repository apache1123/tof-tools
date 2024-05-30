import type { Team } from '../../team';
import { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import { AttackTimeline } from '../attack-timeline/attack-timeline';
import type { Charge } from '../charge/charge';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';

export class AttackFactory {
  public static createAttacks(
    combatDuration: number,
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    charge: Charge
  ): Attack[] {
    return team.weapons.flatMap((weapon) =>
      weapon.attackDefinitions.map((definition) => {
        const timeline = new AttackTimeline(combatDuration);
        return new Attack(
          weapon,
          definition,
          timeline,
          tickTracker,
          weaponTracker,
          charge,
          new AbilityEventTimeCalculator(definition.endedBy, timeline)
        );
      })
    );
  }

  public static getDefinitions(team: Team): AttackDefinition[] {
    return team.weapons.flatMap((weapon) => weapon.attackDefinitions);
  }
}
