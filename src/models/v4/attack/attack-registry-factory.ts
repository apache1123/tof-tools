import type { Team } from '../../team';
import { AttackRegistry } from './attack-registry';
import type { AttackRegistryItem } from './attack-registry-item';
import { AttackTimeline } from './attack-timeline';

export class AttackRegistryFactory {
  public static create(combatDuration: number, team: Team) {
    const items: AttackRegistryItem[] = team.weapons.flatMap((weapon) =>
      weapon.allAttackDefinitions.map((attackDefinition) => ({
        weapon,
        attackDefinition,
        attackTimeline: new AttackTimeline(combatDuration),
      }))
    );

    return new AttackRegistry(items);
  }
}
