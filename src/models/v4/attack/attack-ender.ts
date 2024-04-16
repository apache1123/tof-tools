import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { Attack } from './attack';

export class AttackEnder extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {
    super();
  }

  public handle(data: EventData): void {
    const attackActions = this.attack.endActiveAttacksAt(data.time);
    for (const attackAction of attackActions) {
      this.combatEventNotifier.notifyAttackEnd(attackAction);
    }
  }
}
