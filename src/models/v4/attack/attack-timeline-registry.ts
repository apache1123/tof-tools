import { AbilityTimelineRegistry } from '../ability/ability-timeline-registry';
import type { AttackEvent } from './attack-event';
import type { AttackTimeline } from './attack-timeline';

export class AttackTimelineRegistry extends AbilityTimelineRegistry<
  AttackTimeline,
  AttackEvent
> {
  public getActiveAttackTimelines() {
    return this.items.filter((timeline) => timeline.isActiveAttack);
  }

  public getLastActiveAttackEvent() {
    return this.getActiveAttackTimelines()
      .flatMap((timeline) => timeline.lastEvent ?? [])
      .reduce<AttackEvent | undefined>((result, event) => {
        if (!result) return event;
        return event.startTime >= result.startTime ? event : result;
      }, undefined);
  }
}
