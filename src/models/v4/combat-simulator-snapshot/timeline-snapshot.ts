import type { TimelineEventSnapshot } from './timeline-event-snapshot';

export interface TimelineSnapshot {
  id: string;
  displayName: string;
  events: TimelineEventSnapshot[];
}
