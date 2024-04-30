import { TimeInterval } from '../../time-interval/time-interval';
import { Timeline } from '../timeline';
import { TimelineEvent } from '../timeline-event';

describe('Timeline', () => {
  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(100);

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

    const overlappingEvents = sut.getEventsOverlappingInterval(6, 11);

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
    const sut = new Timeline(100);

    const event1 = new TimelineEvent(new TimeInterval(0, 5));
    const event2 = new TimelineEvent(new TimeInterval(3, 10));
    const event3 = new TimelineEvent(new TimeInterval(10, 15));

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);

    expect(sut.getEventsOverlappingTime(0)).toContain(event1);
    expect(sut.getEventsOverlappingTime(0)).not.toContain(event2);
    expect(sut.getEventsOverlappingTime(0)).not.toContain(event3);

    expect(sut.getEventsOverlappingTime(4)).toContain(event1);
    expect(sut.getEventsOverlappingTime(4)).toContain(event2);
    expect(sut.getEventsOverlappingTime(4)).not.toContain(event3);

    expect(sut.getEventsOverlappingTime(5)).not.toContain(event1);
    expect(sut.getEventsOverlappingTime(5)).toContain(event2);
    expect(sut.getEventsOverlappingTime(5)).not.toContain(event3);

    expect(sut.getEventsOverlappingTime(7)).not.toContain(event1);
    expect(sut.getEventsOverlappingTime(7)).toContain(event2);
    expect(sut.getEventsOverlappingTime(7)).not.toContain(event3);

    expect(sut.getEventsOverlappingTime(10)).not.toContain(event1);
    expect(sut.getEventsOverlappingTime(10)).not.toContain(event2);
    expect(sut.getEventsOverlappingTime(10)).toContain(event3);

    expect(sut.getEventsOverlappingTime(16)).not.toContain(event1);
    expect(sut.getEventsOverlappingTime(16)).not.toContain(event2);
    expect(sut.getEventsOverlappingTime(16)).not.toContain(event3);
  });
});
