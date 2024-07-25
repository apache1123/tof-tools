import type { Serializable } from '../../persistable';
import { Ability } from '../ability/ability';
import type { AbilityEventTimeCalculator } from '../ability/ability-event-time-calculator';
import type { TickTracker } from '../tick-tracker';
import { TimeInterval } from '../time-interval/time-interval';
import type { Timeline } from '../timeline/timeline';
import type { AttackBuff } from './attack-buff';
import type { BuffDefinition, BuffId } from './buff-definition';
import { BuffEvent } from './buff-event';
import type { CritDamageBuff } from './crit-damage-buff';
import type { DamageBuff } from './damage-buff';
import type { BuffDto } from './dtos/buff-dto';
import type { MiscellaneousBuff } from './miscellaneous-buff';

export class Buff extends Ability<BuffEvent> implements Serializable<BuffDto> {
  public readonly id: BuffId;
  public readonly maxStacks: number;

  public readonly attackBuffs: AttackBuff[];
  public readonly damageBuffs: DamageBuff[];
  public readonly critDamageBuffs: CritDamageBuff[];
  public readonly miscBuff?: MiscellaneousBuff;

  public readonly timeline: Timeline<BuffEvent>;

  private readonly abilityEventTimeCalculator: AbilityEventTimeCalculator;

  public constructor(
    definition: BuffDefinition,
    timeline: Timeline<BuffEvent>,
    tickTracker: TickTracker,
    abilityEventTimeCalculator: AbilityEventTimeCalculator
  ) {
    super(definition, timeline, tickTracker);

    const {
      id,
      maxStacks,
      attackBuffs,
      damageBuffs,
      critDamageBuffs,
      miscBuff,
    } = definition;
    this.id = id;
    this.maxStacks = maxStacks;
    this.attackBuffs = attackBuffs ?? [];
    this.damageBuffs = damageBuffs ?? [];
    this.critDamageBuffs = critDamageBuffs ?? [];
    this.miscBuff = miscBuff;

    this.timeline = timeline;
    this.abilityEventTimeCalculator = abilityEventTimeCalculator;
  }

  /** Adds a new buff event to the timeline. Merging with the latest buff event in the timeline if overlaps occur. */
  protected override addEvent(): BuffEvent {
    const timeInterval =
      this.abilityEventTimeCalculator.calculateAbilityEventTimeInterval(
        this.triggerTime
      );
    const buffEvent = new BuffEvent(this, timeInterval);

    const { lastEvent } = this.timeline;
    const { maxStacks } = this;

    // Buff event does not overlap with an existing one whatsoever, add new buff as usual
    if (!lastEvent || buffEvent.startTime > lastEvent.endTime) {
      this.timeline.addEvent(buffEvent);
      return buffEvent;
    }

    // Buff event starts when the previous one ends - Merge the two if they have the same number of stacks, or add a new one if not
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
    const { timeline } = this;
    return {
      ...super.toDto(),
      timeline: {
        events: timeline.events.map((event) => event.toDto()),
        version: 1,
      },
    };
  }
}
