import type { Serializable } from '../../persistable';
import type { DamageSummary } from '../damage-summary/damage-summary';
import { DamageSummaryEvent } from '../damage-summary-timeline/damage-summary-event';
import { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import type { TimeInterval } from '../time-interval/time-interval';
import type { CombatDamageSummaryDto } from './dtos/combat-damage-summary-dto';

/** Timeline to track how much damage has been cumulated at a point of time */
export class CombatDamageSummary
  implements Serializable<CombatDamageSummaryDto>
{
  private readonly timeline: DamageSummaryTimeline;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new DamageSummaryTimeline(totalDuration);
  }

  public get damageSummaryEvents() {
    return this.timeline.events;
  }

  public get lastDamageSummaryEvent() {
    return this.timeline.lastEvent;
  }

  public get cumulatedDamageSummary() {
    return this.lastDamageSummaryEvent?.cumulatedDamageSummary;
  }

  /** Gets the latest damage summary event before the specified time */
  public getDamageSummaryEvent(time: number) {
    return this.timeline.getLatestEventBefore(time);
  }

  public addDamageSummary(
    timeInterval: TimeInterval,
    damageSummary: DamageSummary,
    activeWeaponTotalAttack: number
  ) {
    const { lastEvent: lastEvent } = this.timeline;
    if (lastEvent && timeInterval.startTime < lastEvent.endTime) {
      throw new Error('DamageSummaries must be added chronologically');
    }

    this.timeline.addEvent(
      new DamageSummaryEvent(
        timeInterval,
        damageSummary,
        this.cumulatedDamageSummary?.add(damageSummary) ?? damageSummary,
        activeWeaponTotalAttack
      )
    );
  }

  public toDto(): CombatDamageSummaryDto {
    const { timeline, cumulatedDamageSummary } = this;
    return {
      timeline: timeline.toDto(),
      cumulatedDamageSummary: cumulatedDamageSummary?.toDto(),
      version: 1,
    };
  }
}
