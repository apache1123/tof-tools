import type { TimeInterval } from '../time-interval';
import type { Buff } from './buff';
import type { BuffAction } from './buff-action';
import type { BuffId } from './buff-definition';

export class BuffRegistry {
  private readonly _buffs = new Map<BuffId, Buff>();

  public constructor(buffs: Buff[]) {
    for (const buff of buffs) {
      this._buffs.set(buff.id, buff);
    }
  }

  public get buffs(): Buff[] {
    return [...this._buffs.values()];
  }

  public isBuffActiveAt(buffId: BuffId, time: number) {
    const timeline = this._buffs.get(buffId)?.timeline;
    return timeline && timeline.isActionActiveAt(time);
  }

  public getBuffActions(timeInterval: TimeInterval): BuffAction[] {
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
