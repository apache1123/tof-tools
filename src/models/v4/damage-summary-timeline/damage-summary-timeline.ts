import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { DamageSummaryAction } from './damage-summary-action';
import type { DamageSummaryTimelineDto } from './dtos/damage-summary-timeline-dto';

export class DamageSummaryTimeline
  extends Timeline<DamageSummaryAction>
  implements Serializable<DamageSummaryTimelineDto>
{
  public toDto(): DamageSummaryTimelineDto {
    const { actions } = this;
    return {
      ...super.toDto(),
      actions: actions.map((action) => action.toDto()),
    };
  }
}
