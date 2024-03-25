import { Timeline } from '../timeline';
import { TimelineEvent } from '../timeline-event';

describe('Timeline', () => {
  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(100);

    // Test against the period of 6 to 11.
    const event1 = new TimelineEvent(0, 5); // out
    const event2 = new TimelineEvent(2, 7); // in
    const event3 = new TimelineEvent(6, 11); // in
    const event4 = new TimelineEvent(9, 14); // in
    const event5 = new TimelineEvent(11, 16); // out
    const event6 = new TimelineEvent(12, 17); // out
    const event7 = new TimelineEvent(0, 20); // in
    const event8 = new TimelineEvent(6, 0); // in
    const event9 = new TimelineEvent(11, 0); // out

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);
    sut.addEvent(event4);
    sut.addEvent(event5);
    sut.addEvent(event6);
    sut.addEvent(event7);
    sut.addEvent(event8);
    sut.addEvent(event9);

    const overlappingEvents = sut.getEventsOverlapping(6, 11);

    expect(overlappingEvents).not.toContain(event1);
    expect(overlappingEvents).toContain(event2);
    expect(overlappingEvents).toContain(event3);
    expect(overlappingEvents).toContain(event4);
    expect(overlappingEvents).not.toContain(event5);
    expect(overlappingEvents).not.toContain(event6);
    expect(overlappingEvents).toContain(event7);
    expect(overlappingEvents).toContain(event8);
    expect(overlappingEvents).not.toContain(event9);
  });
});
