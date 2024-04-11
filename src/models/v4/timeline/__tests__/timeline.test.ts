import { Timeline } from '../timeline';
import { TimelineEvent } from '../timeline-event';

describe('Timeline', () => {
  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(100);

    // Test against the period of 6 to 11.
    const event1 = new TimelineEvent(0, 5); // out
    const event2 = new TimelineEvent(2, 9); // in
    const event3 = new TimelineEvent(5, 25); // in
    const event4 = new TimelineEvent(6, 6); // in
    const event5 = new TimelineEvent(7, 18); // in
    const event6 = new TimelineEvent(9, 23); // in
    const event7 = new TimelineEvent(11, 11); // out
    const event8 = new TimelineEvent(12, 29); // out

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);
    sut.addEvent(event4);
    sut.addEvent(event5);
    sut.addEvent(event6);
    sut.addEvent(event7);
    sut.addEvent(event8);

    const overlappingEvents = sut.getEventsOverlappingPeriod(6, 11);

    expect(overlappingEvents).not.toContain(event1);
    expect(overlappingEvents).toContain(event2);
    expect(overlappingEvents).toContain(event3);
    expect(overlappingEvents).toContain(event4);
    expect(overlappingEvents).toContain(event5);
    expect(overlappingEvents).toContain(event5);
    expect(overlappingEvents).toContain(event6);
    expect(overlappingEvents).not.toContain(event7);
    expect(overlappingEvents).not.toContain(event8);
  });

  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(100);

    const event1 = new TimelineEvent(0, 5);
    const event2 = new TimelineEvent(3, 10);
    const event3 = new TimelineEvent(10, 15);

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);

    expect(sut.getEventsOverlappingTime(0)).toContain(event1);
    expect(sut.getEventsOverlappingTime(0)).not.toContain(event2);
    expect(sut.getEventsOverlappingTime(0)).not.toContain(event3);

    expect(sut.getEventsOverlappingTime(3)).toContain(event1);
    expect(sut.getEventsOverlappingTime(3)).toContain(event2);
    expect(sut.getEventsOverlappingTime(2)).not.toContain(event3);

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
