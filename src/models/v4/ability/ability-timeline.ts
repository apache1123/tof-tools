import type { CurrentTick } from '../tick/current-tick';
import { Timeline } from '../timeline/timeline';
import type { AbilityDefinition } from './ability-definition';
import type { AbilityEvent } from './ability-event';

export class AbilityTimeline<
  T extends AbilityEvent = AbilityEvent,
> extends Timeline<T> {
  public constructor(
    private readonly definition: AbilityDefinition,
    endTime: number,
    startTime = 0
  ) {
    super(endTime, startTime);
  }

  public get id() {
    return this.definition.id;
  }

  public get isPlayerTriggered() {
    return !!this.definition.triggeredBy.playerInput;
  }

  /** Returns any events overlapping with the current tick */
  public getCurrentEvents(currentTick: CurrentTick) {
    return this.getEventsOverlappingInterval(
      currentTick.startTime,
      currentTick.endTime
    );
  }

  /** If there are any events at the start of the current tick */
  public hasCurrentEvent(currentTick: CurrentTick) {
    return this.hasEventAt(currentTick.startTime);
  }
}
