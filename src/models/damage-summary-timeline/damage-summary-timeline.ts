import type { Serializable } from "../persistable";
import { Timeline } from "../timeline/timeline";
import type { DamageSummaryEvent } from "./damage-summary-event";
import type { DamageSummaryTimelineDto } from "./dtos/damage-summary-timeline-dto";

export class DamageSummaryTimeline
  extends Timeline<DamageSummaryEvent>
  implements Serializable<DamageSummaryTimelineDto> {}
