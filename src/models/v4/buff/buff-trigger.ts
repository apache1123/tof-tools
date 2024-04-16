import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { Buff } from './buff';

export class BuffTrigger extends EventHandler {
  public constructor(
    private readonly buff: Buff,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {
    super();
  }

  public handle(data: EventData) {
    this.trigger(data);
    return super.handle(data);
  }

  private trigger(eventData: EventData) {
    const buffAction = this.buff.trigger(eventData.time);
    this.combatEventNotifier.notifyBuffStart(buffAction);
  }
}
