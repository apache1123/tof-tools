import type { EventData } from '../event/event-data';
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

  public handle(data: EventData): void {
    const tickEnd = this.tickTracker.getNextClosestTickEnd(data.time);
    this.buff.endActiveBuffsAt(tickEnd);
    return super.handle(data);
  }
}
