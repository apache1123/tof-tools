import type { EventData } from '../event/event-data';
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

  public handle(data: EventData) {
    this.trigger(data);
    return super.handle(data);
  }

  private trigger(eventData: EventData) {
    const tickStart = this.tickTracker.getNextClosestTickStart(eventData.time);
    this.buff.trigger(tickStart);
  }
}
