import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { Buff } from './buff';

export class BuffEnder extends EventHandler {
  public constructor(
    private readonly buff: Buff,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {
    super();
  }

  public handle(data: EventData): void {
    const buffActions = this.buff.endActiveBuffsAt(data.time);
    for (const buffAction of buffActions) {
      this.combatEventNotifier.notifyBuffEnd(buffAction);
    }
  }
}
