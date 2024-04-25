import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Buff } from './buff';

export class BuffTrigger extends EventHandler {
  public constructor(
    private readonly buff: Buff,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle() {
    this.buff.trigger(this.tickTracker.currentTickStart);
    return super.handle();
  }
}
