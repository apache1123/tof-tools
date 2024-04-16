import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { ActionTimeline } from './action-timeline';

export class ActionCooldownHandler extends EventHandler {
  public constructor(private readonly actionTimeline: ActionTimeline) {
    super();
  }

  public handle(eventData: EventData) {
    if (this.isActionOnCooldown(eventData.time)) return;

    return super.handle(eventData);
  }

  private isActionOnCooldown(time: number) {
    return this.actionTimeline.isActionOnCooldownAt(time);
  }
}
