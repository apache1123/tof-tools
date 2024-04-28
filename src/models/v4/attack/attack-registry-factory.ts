import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import { ActionTimeCalculator } from '../action/action-time-calculator';
import { AttackTimeline } from '../attack-timeline/attack-timeline';
import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import { AttackRegistry } from './attack-registry';

export class AttackRegistryFactory {
  public static createPlayerInputAttackRegistry(
    combatDuration: number,
    team: Team
  ) {
    const attacks: Attack[] = team.weapons.flatMap((weapon) =>
      weapon.allPlayerInputAttackDefinitions.map((definition) =>
        this.createAttack(combatDuration, weapon, definition)
      )
    );
    return new AttackRegistry(attacks);
  }

  public static createTriggeredAttackRegistry(
    combatDuration: number,
    team: Team
  ) {
    const attacks: Attack[] = team.weapons.flatMap((weapon) =>
      weapon.allTriggeredAttackDefinitions.map((definition) =>
        this.createAttack(combatDuration, weapon, definition)
      )
    );

    return new AttackRegistry(attacks);
  }

  private static createAttack(
    combatDuration: number,
    weapon: Weapon,
    definition: AttackDefinition
  ) {
    const timeline = new AttackTimeline(combatDuration);
    return new Attack(
      weapon,
      definition,
      timeline,
      new ActionTimeCalculator(definition.endedBy, timeline)
    );
  }
}
