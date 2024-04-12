import BigNumber from 'bignumber.js';

import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import { TimePeriod } from '../time-period';
import { Buff } from './buff';
import type { BuffDefinition } from './buff-definition';
import type { BuffTimeline } from './buff-timeline';

export class BuffTrigger extends EventHandler {
  public constructor(
    private readonly definition: BuffDefinition,
    private readonly timeline: BuffTimeline,
    private readonly eventNotifier: EventNotifier
  ) {
    super();
  }

  public handle(data: EventData): boolean {
    this.trigger(data);
    return super.handle(data);
  }

  private trigger(eventData: EventData) {
    const timePeriod = this.determineBuffTimePeriod(eventData);
    this.addNewBuff(new Buff(this.definition, timePeriod));

    // TODO: move this elsewhere
    this.eventNotifier.notify(
      eventIdProvider.getActionStartEventId(this.definition.id),
      { time: timePeriod.startTime }
    );
  }

  private determineBuffTimePeriod(eventData: EventData): TimePeriod {
    let startTime = eventData.time;
    let endTime!: number;

    const {
      value,
      untilCombatEnd,
      applyToEndSegmentOfCombat,
      followActiveWeapon,
    } = this.definition.duration;
    if (value) {
      endTime = startTime + value;
    } else if (untilCombatEnd || followActiveWeapon) {
      // followActiveWeapon event will be ended by another (not)-active weapon event
      endTime = this.timeline.totalDuration;
    } else if (applyToEndSegmentOfCombat) {
      // TODO: This is awkward
      endTime = this.timeline.totalDuration;
      const duration = BigNumber(this.timeline.totalDuration)
        .times(applyToEndSegmentOfCombat)
        .toNumber();
      startTime = BigNumber(endTime).minus(duration).toNumber();
    } else {
      throw new Error('Cannot determine buff end time');
    }

    return new TimePeriod(startTime, endTime);
  }

  /** Adds a new buff to the timeline. Merging with the latest buff in the timeline if overlaps occur. */
  private addNewBuff(buff: Buff) {
    const { lastEvent: lastBuff } = this.timeline;
    const { maxStacks } = this.definition;

    // Buff does not overlap with an existing one whatsoever, add new buff as usual
    if (!lastBuff || buff.startTime > lastBuff.endTime) {
      this.timeline.addEvent(buff);
      return;
    }

    // Buff starts when the previous one ends - Merge the two of they have the same number of stacks, or add a new one if not
    if (buff.startTime === lastBuff.endTime) {
      if (buff.stacks === lastBuff.stacks) {
        lastBuff.endTime = buff.endTime;
      } else {
        this.timeline.addEvent(buff);
      }
      return;
    }

    // Same time period, increase stack count if applicable
    if (
      buff.startTime === lastBuff.startTime &&
      buff.endTime === lastBuff.endTime
    ) {
      const newStacksCount = Math.min(lastBuff.stacks + buff.stacks, maxStacks);

      if (newStacksCount !== lastBuff.stacks) {
        lastBuff.stacks = newStacksCount;
      }

      return;
    }

    // Time periods overlap, but are not the same
    const newStacksOfOverlappingPeriod = Math.min(
      lastBuff.stacks + buff.stacks,
      maxStacks
    );

    if (newStacksOfOverlappingPeriod === buff.stacks) {
      lastBuff.endTime = buff.endTime;
      return;
    }

    if (newStacksOfOverlappingPeriod === lastBuff.stacks) {
      const newBuff = new Buff(
        this.definition,
        new TimePeriod(lastBuff.endTime, lastBuff.endTime + buff.duration),
        buff.stacks
      );
      this.timeline.addEvent(newBuff);
      return;
    }

    const oldLastBuffEndTime = lastBuff.endTime;

    lastBuff.endTime = buff.startTime;

    const newBuffOfOverlappingPeriod = new Buff(
      this.definition,
      new TimePeriod(buff.startTime, oldLastBuffEndTime),
      newStacksOfOverlappingPeriod
    );
    this.timeline.addEvent(newBuffOfOverlappingPeriod);

    const newBuff = new Buff(
      this.definition,
      new TimePeriod(newBuffOfOverlappingPeriod.endTime, buff.endTime),
      buff.stacks
    );
    this.timeline.addEvent(newBuff);
  }
}
