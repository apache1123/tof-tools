import type { Serializable } from '../../persistable';
import type { BuffEvent } from '../buff-timeline/buff-event';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Buff } from './buff';
import type { BuffId } from './buff-definition';
import type { BuffRegistryDto } from './dtos/buff-registry-dto';

export class BuffRegistry implements Serializable<BuffRegistryDto> {
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
    return timeline && timeline.isAbilityActiveAt(time);
  }

  public getBuffEvents(timeInterval: TimeInterval): BuffEvent[] {
    return this.buffs.flatMap((buff) =>
      buff.getEventsOverlappingInterval(timeInterval)
    );
  }

  public getBuffEventsEndingBetween(timeInterval: TimeInterval): BuffEvent[] {
    return this.buffs.flatMap((buff) =>
      buff.getEventsEndingBetween(timeInterval)
    );
  }

  public toDto(): BuffRegistryDto {
    const { buffs } = this;
    return { buffs: buffs.map((buff) => buff.toDto()), version: 1 };
  }
}
