import { minActionDuration } from '../../../constants/tick';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Attack } from './attack';

export class AttackEnder extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle(): void {
    const attackEndTime = this.tickTracker.currentTickStart + minActionDuration;
    this.attack.endActiveAttacksAt(attackEndTime);
    return super.handle();
  }
}
