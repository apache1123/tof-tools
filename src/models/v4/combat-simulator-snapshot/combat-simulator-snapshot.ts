import type { DamageSummarySnapshot } from './damage-summary-snapshot';
import type { TimelineSnapshot } from './timeline-snapshot';

export interface CombatSimulatorSnapshot {
  playerInputAttackTimelines: TimelineSnapshot[];
  triggeredAttackTimelines: TimelineSnapshot[];
  buffTimelines: TimelineSnapshot[];
  resourceTimelines: TimelineSnapshot[];
  damageTimeline: TimelineSnapshot;
  damageSummary: DamageSummarySnapshot;
}
