import { Registry } from '../registry/registry';
import type { CurrentTick } from '../tick/current-tick';
import type { AbilityId } from './ability-definition';
import type { AbilityEvent } from './ability-event';
import type { AbilityTimeline } from './ability-timeline';

export class AbilityTimelineRegistry<
  TAbilityTimeline extends AbilityTimeline<TAbilityEvent>,
  TAbilityEvent extends AbilityEvent = AbilityEvent,
> extends Registry<TAbilityTimeline> {
  /** Returns any events overlapping with the current tick */
  public getCurrentEvents(currentTick: CurrentTick): TAbilityEvent[] {
    return this.items.flatMap((timeline) =>
      timeline.getCurrentEvents(currentTick)
    );
  }

  /** If there are any events for the specified ability at the start of the current tick */
  public hasCurrentEvent(id: AbilityId, currentTick: CurrentTick): boolean {
    const item = this.getItem(id);
    return !!item?.hasCurrentEvent(currentTick);
  }
}
