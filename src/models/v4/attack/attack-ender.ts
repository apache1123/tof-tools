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
    const tickEnd = this.tickTracker.getNextClosestTickEnd(data.time);
    this.attack.endActiveAttacksAt(tickEnd);
    return super.handle(data);
  }
}
