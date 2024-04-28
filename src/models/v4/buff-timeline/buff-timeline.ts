import type { Serializable } from '../../persistable';
import { ActionTimeline } from '../action-timeline/action-timeline';
import type { BuffAction } from './buff-action';
import type { BuffTimelineDto } from './dtos/buff-timeline-dto';

export class BuffTimeline
  extends ActionTimeline<BuffAction>
  implements Serializable<BuffTimelineDto>
{
  public toDto(): BuffTimelineDto {
    const { actions } = this;
    return {
      ...super.toDto(),
      actions: actions.map((action) => action.toDto()),
    };
  }
}
