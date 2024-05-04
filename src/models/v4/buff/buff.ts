import type { Serializable } from '../../persistable';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import type { AbilityRequirements } from '../ability/ability-requirements';
import type { AbilityTriggeredBy } from '../ability/ability-triggered-by';
import type { AbilityUpdatesResource } from '../ability/ability-updates-resource';
import { BuffEvent } from '../buff-timeline/buff-event';
import type { BuffTimeline } from '../buff-timeline/buff-timeline';
import { TimeInterval } from '../time-interval/time-interval';
import type { AttackBuff } from './attack-buff';
import type { BuffDefinition, BuffId } from './buff-definition';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { BuffDto } from './dtos/buff-dto';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class Buff implements Serializable<BuffDto> {
  public readonly id: BuffId;
  public readonly displayName: string;
  public readonly maxStacks: number;
  public readonly cooldown: number;

  public readonly attackBuffs: AttackBuff[];
  public readonly damageBuffs: DamageBuff[];
  public readonly critDamageBuffs: CritDamageBuff[];
  public readonly miscBuff?: MiscellaneousBuff;

  public readonly triggeredBy: AbilityTriggeredBy;
  public readonly endedBy: AbilityEndedBy;
  public readonly requirements: AbilityRequirements;
  public readonly updatesResources: AbilityUpdatesResource[];

  public readonly timeline: BuffTimeline;

  private readonly abilityEventTimeCalculator: AbilityEventTimeCalculator;

  public constructor(
    definition: BuffDefinition,
    timeline: BuffTimeline,
    abilityEventTimeCalculator: AbilityEventTimeCalculator
  ) {
    const {
      id,
      displayName,
      maxStacks,
      cooldown,
      attackBuffs,
      damageBuffs,
      critDamageBuffs,
      miscBuff,
      triggeredBy,
      endedBy,
      requirements,
      updatesResources,
    } = definition;
    this.id = id;
    this.displayName = displayName;
    this.maxStacks = maxStacks;
    this.cooldown = cooldown;
    this.attackBuffs = attackBuffs ?? [];
    this.damageBuffs = damageBuffs ?? [];
    this.critDamageBuffs = critDamageBuffs ?? [];
    this.miscBuff = miscBuff;
    this.triggeredBy = triggeredBy;
    this.endedBy = endedBy;
    this.requirements = requirements;
    this.updatesResources = updatesResources ?? [];

    this.timeline = timeline;
    this.abilityEventTimeCalculator = abilityEventTimeCalculator;
  }

  public trigger(time: number): BuffEvent {
    const timeInterval =
      this.abilityEventTimeCalculator.calculateAbilityEventTimeInterval(time);
    return this.addNewBuffEvent(new BuffEvent(this, timeInterval));
  }

  public endActiveBuffsAt(time: number) {
    return this.timeline.endAnyEventsAt(time);
  }

  public getBuffEventsEndingBetween(timeInterval: TimeInterval) {
    return this.timeline.getEventsEndingBetween(timeInterval);
  }

  public getBuffEventsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getEventsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  /** Adds a new buff event to the timeline. Merging with the latest buff event in the timeline if overlaps occur. */
  private addNewBuffEvent(buffEvent: BuffEvent): BuffEvent {
    const { lastEvent } = this.timeline;
    const { maxStacks } = this;

    // Buff event does not overlap with an existing one whatsoever, add new buff as usual
    if (!lastEvent || buffEvent.startTime > lastEvent.endTime) {
      this.timeline.addEvent(buffEvent);
      return buffEvent;
    }

    // Buff event starts when the previous one ends - Merge the two of they have the same number of stacks, or add a new one if not
    if (buffEvent.startTime === lastEvent.endTime) {
      if (buffEvent.stacks === lastEvent.stacks) {
        lastEvent.endTime = buffEvent.endTime;
      } else {
        this.timeline.addEvent(buffEvent);
      }
      return buffEvent;
    }

    // Same time interval, increase stack count if applicable
    if (
      buffEvent.startTime === lastEvent.startTime &&
      buffEvent.endTime === lastEvent.endTime
    ) {
      const newStacksCount = Math.min(
        lastEvent.stacks + buffEvent.stacks,
        maxStacks
      );

      if (newStacksCount !== lastEvent.stacks) {
        lastEvent.stacks = newStacksCount;
      }

      return buffEvent;
    }

    // Time intervals overlap, but are not the same
    const newStacksOfOverlappingInterval = Math.min(
      lastEvent.stacks + buffEvent.stacks,
      maxStacks
    );

    if (newStacksOfOverlappingInterval === buffEvent.stacks) {
      lastEvent.endTime = buffEvent.endTime;
      return buffEvent;
    }

    if (newStacksOfOverlappingInterval === lastEvent.stacks) {
      const newBuffEvent = new BuffEvent(
        this,
        new TimeInterval(
          lastEvent.endTime,
          lastEvent.endTime + buffEvent.duration
        ),
        buffEvent.stacks
      );
      this.timeline.addEvent(newBuffEvent);
      return newBuffEvent;
    }

    const oldLastBuffEndTime = lastEvent.endTime;

    lastEvent.endTime = buffEvent.startTime;

    const newBuffOfOverlappingInterval = new BuffEvent(
      this,
      new TimeInterval(buffEvent.startTime, oldLastBuffEndTime),
      newStacksOfOverlappingInterval
    );
    this.timeline.addEvent(newBuffOfOverlappingInterval);

    const newBuffEvent = new BuffEvent(
      this,
      new TimeInterval(newBuffOfOverlappingInterval.endTime, buffEvent.endTime),
      buffEvent.stacks
    );
    this.timeline.addEvent(newBuffEvent);
    return newBuffEvent;
  }

  public toDto(): BuffDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
