import type { Serializable } from '../../persistable';
import { TimeInterval } from '../time-interval/time-interval';
import type { TimelineActionDto } from './dtos/timeline-action-dto';

export class TimelineAction
  extends TimeInterval
  implements Serializable<TimelineActionDto> {}
