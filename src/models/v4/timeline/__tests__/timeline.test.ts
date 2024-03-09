import { Timeline } from '../timeline';
import { TimelineEvent } from '../timeline-event';
import { type TimelineEventData } from '../timeline-event-data';

describe('Timeline', () => {
  const mockData = {} as TimelineEventData;

  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline();

    // Test against the period of 6 to 11.
    const event1 = new TimelineEvent(0, 5, mockData); // out
    const event2 = new TimelineEvent(2, 7, mockData); // in
    const event3 = new TimelineEvent(6, 11, mockData); // in
    const event4 = new TimelineEvent(9, 14, mockData); // in
    const event5 = new TimelineEvent(11, 16, mockData); // out
    const event6 = new TimelineEvent(12, 17, mockData); // out

    sut.addEvent(event1);
    sut.addEvent(event2);
    sut.addEvent(event3);
    sut.addEvent(event4);
    sut.addEvent(event5);
    sut.addEvent(event6);

    const overlappingEvents = sut.getEventsOverlapping(6, 11);

    expect(overlappingEvents).not.toContain(event1);
    expect(overlappingEvents).toContain(event2);
    expect(overlappingEvents).toContain(event3);
    expect(overlappingEvents).toContain(event4);
    expect(overlappingEvents).not.toContain(event5);
    expect(overlappingEvents).not.toContain(event6);
  });
});
