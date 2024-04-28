import type { ActionTimeline } from '../action-timeline/action-timeline';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';

export class ActionCooldownHandler extends EventHandler {
  public constructor(
    private readonly actionTimeline: ActionTimeline,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle() {
    if (
      this.actionTimeline.isActionOnCooldownAt(
        this.tickTracker.currentTickStart
      )
    )
      return;

    return super.handle();
  }
}
