import { TimeInterval } from '../../time-interval/time-interval';
import { Timeline } from '../timeline';
import { TimelineEvent } from '../timeline-event';

describe('Timeline', () => {
  const timelineDuration = 100;

  describe('adding events', () => {
    it('throws an error when trying to add a new event with a start time earlier than the start time of the latest event', () => {
      const sut = new Timeline(timelineDuration);
      sut.addEvent(new TimelineEvent(new TimeInterval(5, 7)));
      expect(() => {
        sut.addEvent(new TimelineEvent(new TimeInterval(3, 7)));
      }).toThrow();
    });
  });

  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(timelineDuration);

    // Test against the interval of 6 to 11.
    const event1 = new TimelineEvent(new TimeInterval(0, 5)); // out
    const event2 = new TimelineEvent(new TimeInterval(1, 6)); // out
    const event3 = new TimelineEvent(new TimeInterval(2, 7)); // in
    const event4 = new TimelineEvent(new TimeInterval(5, 25)); // in
    const event5 = new TimelineEvent(new TimeInterval(6, 7)); // in
    const event6 = new TimelineEvent(new TimeInterval(7, 18)); // in
    const event7 = new TimelineEvent(new TimeInterval(9, 23)); // in
    const event8 = new TimelineEvent(new TimeInterval(11, 12)); // out
    const event9 = new TimelineEvent(new TimeInterval(12, 29)); // out

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);
    sut.addEvent(event4);
    sut.addEvent(event5);
    sut.addEvent(event6);
    sut.addEvent(event7);
    sut.addEvent(event8);
    sut.addEvent(event9);

    const overlappingEvents = sut.getEventsOverlapping(new TimeInterval(6, 11));

    expect(overlappingEvents).not.toContain(event1);
    expect(overlappingEvents).not.toContain(event2);
    expect(overlappingEvents).toContain(event3);
    expect(overlappingEvents).toContain(event4);
    expect(overlappingEvents).toContain(event5);
    expect(overlappingEvents).toContain(event6);
    expect(overlappingEvents).toContain(event7);
    expect(overlappingEvents).not.toContain(event8);
    expect(overlappingEvents).not.toContain(event9);
  });

  it('returns correct events overlapping with the specified time', () => {
    const sut = new Timeline(timelineDuration);

    const event1 = new TimelineEvent(new TimeInterval(0, 5));
    const event2 = new TimelineEvent(new TimeInterval(3, 10));
    const event3 = new TimelineEvent(new TimeInterval(10, 15));

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);

    expect(sut.getEventsAt(0)).toContain(event1);
    expect(sut.getEventsAt(0)).not.toContain(event2);
    expect(sut.getEventsAt(0)).not.toContain(event3);

    expect(sut.getEventsAt(4)).toContain(event1);
    expect(sut.getEventsAt(4)).toContain(event2);
    expect(sut.getEventsAt(4)).not.toContain(event3);

    expect(sut.getEventsAt(5)).not.toContain(event1);
    expect(sut.getEventsAt(5)).toContain(event2);
    expect(sut.getEventsAt(5)).not.toContain(event3);

    expect(sut.getEventsAt(7)).not.toContain(event1);
    expect(sut.getEventsAt(7)).toContain(event2);
    expect(sut.getEventsAt(7)).not.toContain(event3);

    expect(sut.getEventsAt(10)).not.toContain(event1);
    expect(sut.getEventsAt(10)).not.toContain(event2);
    expect(sut.getEventsAt(10)).toContain(event3);

    expect(sut.getEventsAt(16)).not.toContain(event1);
    expect(sut.getEventsAt(16)).not.toContain(event2);
    expect(sut.getEventsAt(16)).not.toContain(event3);
  });

  it('returns correct events that end between the specified time interval', () => {
    const sut = new Timeline(timelineDuration);

    const event1 = new TimelineEvent(new TimeInterval(0, 5));
    const event2 = new TimelineEvent(new TimeInterval(3, 10));
    const event3 = new TimelineEvent(new TimeInterval(10, 15));

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);

    expect(sut.getEventsEndingBetween(new TimeInterval(4, 10))).toEqual([
      event1,
      event2,
    ]);
    expect(sut.getEventsEndingBetween(new TimeInterval(5, 11))).toEqual([
      event2,
    ]);
    expect(sut.getEventsEndingBetween(new TimeInterval(10, 12))).toEqual([]);
    expect(sut.getEventsEndingBetween(new TimeInterval(5, 12))).toEqual([
      event2,
    ]);
  });

  it('returns the latest event that ends before the specified time', () => {
    const sut = new Timeline(timelineDuration);

    const event1 = new TimelineEvent(new TimeInterval(0, 5));
    const event2 = new TimelineEvent(new TimeInterval(3, 10));
    const event3 = new TimelineEvent(new TimeInterval(10, 15));

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);

    expect(sut.getLatestEventBefore(4)).toBeUndefined();
    expect(sut.getLatestEventBefore(5)).toEqual(event1);
    expect(sut.getLatestEventBefore(9)).toEqual(event1);
    expect(sut.getLatestEventBefore(15)).toEqual(event3);
    expect(sut.getLatestEventBefore(16)).toEqual(event3);
  });

  describe('ending events', () => {
    it('should not end any events if there are no events', () => {
      const sut = new Timeline(timelineDuration);
      sut.endAnyEventsAt(0);
      expect(sut.events).toHaveLength(0);
    });

    it('should end any events that overlap with the time', () => {
      const sut = new Timeline(timelineDuration);
      sut.addEvent(new TimelineEvent(new TimeInterval(0, 10)));

      sut.endAnyEventsAt(5);

      const events = sut.events;
      expect(events[0].startTime).toBe(0);
      expect(events[0].endTime).toBe(5);
    });

    it('should not end any events that do not overlap with the time', () => {
      const sut = new Timeline(timelineDuration);
      sut.addEvent(new TimelineEvent(new TimeInterval(0, 10)));
      sut.addEvent(new TimelineEvent(new TimeInterval(20, 30)));

      sut.endAnyEventsAt(15);

      const events = sut.events;
      expect(events[0].startTime).toBe(0);
      expect(events[0].endTime).toBe(10);
      expect(events[1].startTime).toBe(20);
      expect(events[1].endTime).toBe(30);
    });

    it('should remove an event if ending that event at the specified time will cause it to have a zero duration', () => {
      const sut = new Timeline(timelineDuration);
      sut.addEvent(new TimelineEvent(new TimeInterval(10, 20)));

      sut.endAnyEventsAt(10);

      const events = sut.events;
      expect(events).toHaveLength(0);
    });
  });
});
