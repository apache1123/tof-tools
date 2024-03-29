import { Timeline } from '../timeline/timeline';
import type { Attack } from './attack';

/** Attack timeline that forces adding events in sequential chronological order i.e. a subsequent event cannot be added before the previous event has ended */
export class AttackTimeline {
  private readonly timeline: Timeline<Attack>;

  public constructor(public readonly totalDuration: number) {
    this.timeline = new Timeline(totalDuration);
  }

  public get attacks(): readonly Attack[] {
    return this.timeline.events;
  }

  public get lastAttack() {
    return this.timeline.lastEvent;
  }

  /** Adds a new attack at the end of the timeline. The new attack's start time cannot be earlier than the end time of the existing last attack */
  public addAttack(attack: Attack) {
    if (this.lastAttack && attack.startTime < this.lastAttack.endTime) {
      throw new Error('Invalid startTime when adding a new TimelineEvent');
    }

    this.timeline.addEvent(attack);
  }

  public isAttackOnCooldownAt(time: number) {
    return this.attacks.some(
      (attack) => attack.startTime <= time && attack.cooldownEndsAt > time
    );
  }

  public getAttacksOverlappingPeriod(startTime: number, endTime: number) {
    return this.timeline.getEventsOverlappingPeriod(startTime, endTime);
  }
}
