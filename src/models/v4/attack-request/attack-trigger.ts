import { Attack } from '../attack/attack';
import type { AttackTimeline } from '../attack/attack-timeline';
import type { AttackNotifier } from '../attack-event/attack-notifier';
import type { TimeTracker } from '../time-tracker';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackTrigger extends AttackRequestHandler {
  public constructor(
    private readonly timeline: AttackTimeline,
    private readonly timeTracker: TimeTracker,
    private readonly attackNotifier: AttackNotifier
  ) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    this.triggerAttack(attackRequest);
    return super.handle(attackRequest);
  }

  private triggerAttack(attackRequest: AttackRequest) {
    const attack = new Attack(attackRequest);
    this.timeline.addAttack(attack);

    this.timeTracker.nextAttackTime = attack.endTime;

    attack.broadcast(this.attackNotifier);
  }
}
