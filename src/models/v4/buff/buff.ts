import type { Serializable } from '../../persistable';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionRequirements } from '../action/action-requirements';
import type { ActionTimeCalculator } from '../action/action-time-calculator';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { ActionUpdatesResource } from '../action/action-updates-resource';
import { BuffAction } from '../buff-timeline/buff-action';
import type { BuffTimeline } from '../buff-timeline/buff-timeline';
import { TimeInterval } from '../time-interval/time-interval';
import type { AttackBuff } from './attack-buff';
import type { BuffDefinition, BuffId } from './buff-definition';
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
  public readonly miscBuff?: MiscellaneousBuff;

  public readonly triggeredBy: ActionTriggeredBy;
  public readonly endedBy: ActionEndedBy;
  public readonly requirements: ActionRequirements;
  public readonly updatesResources: ActionUpdatesResource[];

  public readonly timeline: BuffTimeline;

  private readonly actionTimeCalculator: ActionTimeCalculator;

  public constructor(
    definition: BuffDefinition,
    timeline: BuffTimeline,
    actionTimeCalculator: ActionTimeCalculator
  ) {
    const {
      id,
      displayName,
      maxStacks,
      cooldown,
      attackBuffs,
      damageBuffs,
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
    this.miscBuff = miscBuff;
    this.triggeredBy = triggeredBy;
    this.endedBy = endedBy;
    this.requirements = requirements;
    this.updatesResources = updatesResources ?? [];

    this.timeline = timeline;
    this.actionTimeCalculator = actionTimeCalculator;
  }

  public trigger(time: number): BuffAction {
    const timeInterval =
      this.actionTimeCalculator.calculateActionTimeInterval(time);
    return this.addNewBuffAction(new BuffAction(this, timeInterval));
  }

  public endActiveBuffsAt(time: number) {
    return this.timeline.endAnyActionsAt(time);
  }

  public getBuffActionsEndingBetween(timeInterval: TimeInterval) {
    return this.timeline.getActionsEndingBetween(timeInterval);
  }

  public getBuffActionsOverlappingInterval(timeInterval: TimeInterval) {
    return this.timeline.getActionsOverlappingInterval(
      timeInterval.startTime,
      timeInterval.endTime
    );
  }

  /** Adds a new buff action to the timeline. Merging with the latest buff in the timeline if overlaps occur. */
  private addNewBuffAction(buffAction: BuffAction): BuffAction {
    const { lastAction } = this.timeline;
    const { maxStacks } = this;

    // Buff action does not overlap with an existing one whatsoever, add new buff as usual
    if (!lastAction || buffAction.startTime > lastAction.endTime) {
      this.timeline.addAction(buffAction);
      return buffAction;
    }

    // Buff action starts when the previous one ends - Merge the two of they have the same number of stacks, or add a new one if not
    if (buffAction.startTime === lastAction.endTime) {
      if (buffAction.stacks === lastAction.stacks) {
        lastAction.endTime = buffAction.endTime;
      } else {
        this.timeline.addAction(buffAction);
      }
      return buffAction;
    }

    // Same time interval, increase stack count if applicable
    if (
      buffAction.startTime === lastAction.startTime &&
      buffAction.endTime === lastAction.endTime
    ) {
      const newStacksCount = Math.min(
        lastAction.stacks + buffAction.stacks,
        maxStacks
      );

      if (newStacksCount !== lastAction.stacks) {
        lastAction.stacks = newStacksCount;
      }

      return buffAction;
    }

    // Time intervals overlap, but are not the same
    const newStacksOfOverlappingInterval = Math.min(
      lastAction.stacks + buffAction.stacks,
      maxStacks
    );

    if (newStacksOfOverlappingInterval === buffAction.stacks) {
      lastAction.endTime = buffAction.endTime;
      return buffAction;
    }

    if (newStacksOfOverlappingInterval === lastAction.stacks) {
      const newBuffAction = new BuffAction(
        this,
        new TimeInterval(
          lastAction.endTime,
          lastAction.endTime + buffAction.duration
        ),
        buffAction.stacks
      );
      this.timeline.addAction(newBuffAction);
      return newBuffAction;
    }

    const oldLastBuffEndTime = lastAction.endTime;

    lastAction.endTime = buffAction.startTime;

    const newBuffOfOverlappingInterval = new BuffAction(
      this,
      new TimeInterval(buffAction.startTime, oldLastBuffEndTime),
      newStacksOfOverlappingInterval
    );
    this.timeline.addAction(newBuffOfOverlappingInterval);

    const newBuffAction = new BuffAction(
      this,
      new TimeInterval(
        newBuffOfOverlappingInterval.endTime,
        buffAction.endTime
      ),
      buffAction.stacks
    );
    this.timeline.addAction(newBuffAction);
    return newBuffAction;
  }

  public toDto(): BuffDto {
    const { id, displayName, timeline } = this;
    return { id, displayName, timeline: timeline.toDto(), version: 1 };
  }
}
