import type { TimelineActionSnapshot } from './timeline-action-snapshot';

export interface TimelineSnapshot {
  id: string;
  displayName: string;
  actions: TimelineActionSnapshot[];
}
