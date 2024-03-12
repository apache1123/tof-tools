import { StackableChronologicalTimeline } from '../stackable-timeline';
import { StackableTimelineEvent } from '../stackable-timeline-event';
import type { TimelineEventData } from '../timeline-event-data';

describe('Stackable chronological timeline', () => {
  const mockData = {} as TimelineEventData;

  describe('adding an event that overlaps with an existing one', () => {
    it('splits the events into smaller events with the correct stacks', () => {
      const sut = new StackableChronologicalTimeline();
      sut.addEvent(new StackableTimelineEvent(0, 10, mockData, 2));
      sut.addEvent(new StackableTimelineEvent(5, 10, mockData, 2));

      expect(sut.events.length).toBe(3);

      const firstEvent = sut.events[0];
      expect(firstEvent.startTime).toBe(0);
      expect(firstEvent.endTime).toBe(5);
      expect(firstEvent.stacks).toBe(1);

      const secondEvent = sut.events[1];
      expect(secondEvent.startTime).toBe(5);
      expect(secondEvent.endTime).toBe(10);
      expect(secondEvent.stacks).toBe(2);

      const thirdEvent = sut.events[2];
      expect(thirdEvent.startTime).toBe(10);
      expect(thirdEvent.endTime).toBe(15);
      expect(thirdEvent.stacks).toBe(1);
    });

    it('merges the two events by increasing the existing the duration of the existing event, if the resulting stacks of the two events are the same', () => {
      const sut = new StackableChronologicalTimeline();
      sut.addEvent(new StackableTimelineEvent(0, 10, mockData, 1));
      sut.addEvent(new StackableTimelineEvent(5, 10, mockData, 1));

      expect(sut.events.length).toBe(1);
      expect(sut.events[0].endTime).toBe(15);
    });
  });
});
