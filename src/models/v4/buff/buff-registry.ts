import type { TimeInterval } from '../time-interval';
import type { Buff } from './buff';
import type { BuffAction } from './buff-action';
import type { BuffId } from './buff-definition';

export class BuffRegistry {
  public readonly buffs: Buff[];

  public constructor(buffs: Buff[]) {
    this.buffs = buffs;
  }

  public isBuffActiveAt(buffId: BuffId, time: number) {
    const timeline = this.buffs.find(
      ({ definition }) => definition.id === buffId
    )?.timeline;

    return timeline && timeline.isActionActiveAt(time);
  }

  public getActiveBuffs(timeInterval: TimeInterval): Buff[] {
    return this.buffs.filter(
      (buff) => buff.getBuffActionsOverlappingInterval(timeInterval).length
    );
  }

  public getActiveBuffActions(timeInterval: TimeInterval): BuffAction[] {
    return this.buffs.flatMap((buff) =>
      buff.getBuffActionsOverlappingInterval(timeInterval)
    );
  }

  public getBuffActionsEndingBetween(timeInterval: TimeInterval): BuffAction[] {
    return this.buffs.flatMap((buff) =>
      buff.getBuffActionsEndingBetween(timeInterval)
    );
  }
}
