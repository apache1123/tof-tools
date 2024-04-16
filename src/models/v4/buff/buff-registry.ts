import type { TimePeriod } from '../time-period';
import type { Buff } from './buff';
import type { BuffAction } from './buff-action';
import type { BuffId } from './buff-definition';

export class BuffRegistry {
  public readonly buffs: Buff[];

  public constructor(buffs: Buff[]) {
    this.buffs = buffs;
  }

  public isBuffActiveAt(buffId: BuffId, time: number) {
    const timeline = [...this.buffs].find(
      ({ definition }) => definition.id === buffId
    )?.timeline;

    return timeline && timeline.isActionActiveAt(time);
  }

  public getActiveBuffActions(timePeriod: TimePeriod): BuffAction[] {
    const { startTime, endTime } = timePeriod;
    return [...this.buffs].flatMap(({ timeline }) =>
      timeline.getActionsOverlappingPeriod(startTime, endTime)
    );
  }

  public getBuffActionsEndingBetween(timePeriod: TimePeriod): BuffAction[] {
    return this.buffs.flatMap((buff) =>
      buff.getBuffActionsEndingBetween(timePeriod)
    );
  }
}
