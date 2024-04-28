import type { Serializable } from '../../persistable';
import type { DamageSummary } from '../damage-summary/damage-summary';
import { DamageSummaryAction } from '../damage-summary-timeline/damage-summary-action';
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

  public get damageSummaryActions() {
    return this.timeline.actions;
  }

  public get lastDamageSummaryAction() {
    return this.timeline.lastAction;
  }

  public get cumulatedDamageSummary() {
    return this.lastDamageSummaryAction?.cumulatedDamageSummary;
  }

  /** Gets the latest damage summary event before the specified time */
  public getDamageSummaryAction(time: number) {
    return this.timeline.getLatestActionBefore(time);
  }

  public addDamageSummary(
    timeInterval: TimeInterval,
    damageSummary: DamageSummary,
    activeWeaponTotalAttack: number
  ) {
    const { lastAction: lastEvent } = this.timeline;
    if (lastEvent && timeInterval.startTime < lastEvent.endTime) {
      throw new Error('DamageSummaries must be added chronologically');
    }

    this.timeline.addAction(
      new DamageSummaryAction(
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
