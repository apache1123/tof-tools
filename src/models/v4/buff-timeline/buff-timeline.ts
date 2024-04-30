import type { Serializable } from '../../persistable';
import { AbilityTimeline } from '../ability-timeline/ability-timeline';
import type { BuffEvent } from './buff-event';
import type { BuffTimelineDto } from './dtos/buff-timeline-dto';

export class BuffTimeline
  extends AbilityTimeline<BuffEvent>
  implements Serializable<BuffTimelineDto>
{
  public toDto(): BuffTimelineDto {
    const { events } = this;
    return {
      ...super.toDto(),
      events: events.map((event) => event.toDto()),
    };
  }
}
