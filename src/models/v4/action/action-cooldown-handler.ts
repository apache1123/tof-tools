import type { AttackRequest } from '../attack-request/attack-request';
import { AttackRequestHandler } from '../attack-request/attack-request-handler';
import type { ActionTimeline } from './action-timeline';

export class ActionCooldownHandler extends AttackRequestHandler {
  public constructor(private readonly actionTimeline: ActionTimeline) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    if (this.isActionOnCooldown(attackRequest.time)) return false;

    return super.handle(attackRequest);
  }

  private isActionOnCooldown(time: number) {
    return this.actionTimeline.isActionOnCooldownAt(time);
  }
}
