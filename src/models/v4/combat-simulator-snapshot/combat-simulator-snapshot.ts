import type { DamageSummarySnapshot } from './damage-summary-snapshot';
import type { TimelineSnapshot } from './timeline-snapshot';

export interface CombatSimulatorSnapshot {
  attackTimelines: TimelineSnapshot[];
  buffTimelines: TimelineSnapshot[];
  damageTimeline: TimelineSnapshot;
  damageSummary: DamageSummarySnapshot;
}
