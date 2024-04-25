import { minActionDuration } from '../../../constants/tick';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Buff } from './buff';

export class BuffEnder extends EventHandler {
  public constructor(
    private readonly buff: Buff,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle(): void {
    const buffEndTime = this.tickTracker.currentTickStart + minActionDuration;
    this.buff.endActiveBuffsAt(buffEndTime);
    return super.handle();
  }
}
