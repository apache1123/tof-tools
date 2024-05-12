import type { AbilityTimeline } from '../ability-timeline/ability-timeline';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';

export class AbilityCooldownHandler extends EventHandler {
  public constructor(
    private readonly abilityTimeline: AbilityTimeline,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle() {
    if (
      this.abilityTimeline.hasEventOnCooldownAt(
        this.tickTracker.currentTickStart
      )
    )
      return;

    return super.handle();
  }
}
