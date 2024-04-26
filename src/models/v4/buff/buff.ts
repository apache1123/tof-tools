import type { ActionTimeCalculator } from '../action/action-time-calculator';
import { TimeInterval } from '../time-interval';
import { BuffAction } from './buff-action';
import type { BuffDefinition } from './buff-definition';
import type { BuffTimeline } from './buff-timeline';

export class Buff {
  public readonly definition: BuffDefinition;
  public readonly timeline: BuffTimeline;

  private readonly actionTimeCalculator: ActionTimeCalculator;

  public constructor(
    definition: BuffDefinition,
    timeline: BuffTimeline,
    actionTimeCalculator: ActionTimeCalculator
  ) {
    this.definition = definition;
    this.timeline = timeline;
    this.actionTimeCalculator = actionTimeCalculator;
  }

  public get id() {
    return this.definition.id;
  }

  public trigger(time: number): BuffAction {
    const timeInterval =
      this.actionTimeCalculator.calculateActionTimeInterval(time);
    return this.addNewBuffAction(new BuffAction(this.definition, timeInterval));
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

  public get updatesResources() {
    return this.definition.updatesResources;
  }

  /** Adds a new buff action to the timeline. Merging with the latest buff in the timeline if overlaps occur. */
  private addNewBuffAction(buffAction: BuffAction): BuffAction {
    const { lastAction } = this.timeline;
    const { maxStacks } = this.definition;

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
        this.definition,
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
      this.definition,
      new TimeInterval(buffAction.startTime, oldLastBuffEndTime),
      newStacksOfOverlappingInterval
    );
    this.timeline.addAction(newBuffOfOverlappingInterval);

    const newBuffAction = new BuffAction(
      this.definition,
      new TimeInterval(
        newBuffOfOverlappingInterval.endTime,
        buffAction.endTime
      ),
      buffAction.stacks
    );
    this.timeline.addAction(newBuffAction);
    return newBuffAction;
  }
}
