import { EventHandler } from '../event/event-handler';
import type { AttackEvent } from './attack-event';

export class AttackEventHandler extends EventHandler {
  public handle(attackEvent: AttackEvent): boolean {
    return super.handle(attackEvent);
  }
}
