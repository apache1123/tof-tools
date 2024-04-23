import type { EventData } from '../event/event-data';
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

  public handle(data: EventData): void {
    const tickStart = this.tickTracker.getNextClosestTickStart(data.time);
    this.attack.endActiveAttacksAt(tickStart);
    return super.handle(data);
  }
}
