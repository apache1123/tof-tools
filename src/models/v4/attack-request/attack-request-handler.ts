import { EventHandler } from '../event/event-handler';
import type { AttackRequest } from './attack-request';

export class AttackRequestHandler extends EventHandler {
  public handle(attackRequest: AttackRequest) {
    return super.handle(attackRequest);
  }
}
