import type { Team } from '../../team';
import type { Charge } from '../charge/charge';
import type { TickTracker } from '../tick-tracker';
import { Timeline } from '../timeline/timeline';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import type { AttackEvent } from './attack-event';

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
        const timeline = new Timeline<AttackEvent>(combatDuration);
        return new Attack(
          weapon,
          definition,
          timeline,
          tickTracker,
          weaponTracker,
          charge
        );
      })
    );
  }

  public static getDefinitions(team: Team): AttackDefinition[] {
    return team.weapons.flatMap((weapon) => weapon.attackDefinitions);
  }
}
