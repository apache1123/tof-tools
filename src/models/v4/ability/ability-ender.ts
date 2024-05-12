import { minEventDuration } from '../../../constants/tick';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Ability } from './ability';

export class AbilityEnder extends EventHandler {
  public constructor(
    private readonly ability: Ability<AbilityEvent>,
    private readonly tickTracker: TickTracker
  ) {
    super();
  }

  public handle(): void {
    const abilityEndTime = this.tickTracker.currentTickStart + minEventDuration;
    this.ability.endActiveEventsAt(abilityEndTime);
    return super.handle();
  }
}
