import type { TimePeriod } from '../time-period';
import type { Buff } from './buff';
import type { BuffDefinition, BuffId } from './buff-definition';
import type { BuffTimeline } from './buff-timeline';

export class BuffRegistry {
  public constructor(
    public readonly buffTimelines: Map<BuffDefinition, BuffTimeline>
  ) {}

  public isBuffActiveAt(buffId: BuffId, time: number) {
    const timeline = [...this.buffTimelines].find(
      ([buffDefinition]) => buffDefinition.id === buffId
    )?.[1];

    return timeline && timeline.isActionActiveAt(time);
  }

  public getActiveBuffs(timePeriod: TimePeriod): Buff[] {
    const { startTime, endTime } = timePeriod;
    return [...this.buffTimelines].flatMap(([, buffTimeline]) =>
      buffTimeline.getEventsOverlappingPeriod(startTime, endTime)
    );
  }
}
