import { AbilityTimelineRegistry } from '../ability/ability-timeline-registry';
import type { BuffEvent } from './buff-event';
import type { BuffTimeline } from './buff-timeline';

export class BuffTimelineRegistry extends AbilityTimelineRegistry<
  BuffTimeline,
  BuffEvent
> {}
