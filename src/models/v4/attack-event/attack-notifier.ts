import { EventNotifier } from '../event/event-notifier';
import type { AttackEvent } from './attack-event';

export class AttackNotifier extends EventNotifier {
  public notify(eventId: string, attackEvent: AttackEvent) {
    return super.notify(eventId, attackEvent);
  }
}
