import type { Team } from '../../team';
import type { Charge } from '../charge/charge';
import type { TickTracker } from '../tick/tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import { AttackTimeline } from './attack-timeline';

export class AttackFactory {
  public static createAttacks(
    combatDuration: number,
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    charge: Charge
  ): { attack: Attack; timeline: AttackTimeline }[] {
    return team.weapons.flatMap((weapon) =>
      weapon.attackDefinitions.map((definition) => {
        const timeline = new AttackTimeline(definition, combatDuration);
        const attack = new Attack(
          weapon,
          definition,
          timeline,
          tickTracker,
          weaponTracker,
          charge
        );
        return { attack, timeline };
      })
    );
  }

  public static getDefinitions(team: Team): AttackDefinition[] {
    return team.weapons.flatMap((weapon) => weapon.attackDefinitions);
  }
}
