import { EventNotifier } from '../event/event-notifier';
import type { AttackRequest } from './attack-request';

export class AttackRequestNotifier extends EventNotifier {
  public notify(eventId: string, attackRequest: AttackRequest) {
    return super.notify(eventId, attackRequest);
  }
}
