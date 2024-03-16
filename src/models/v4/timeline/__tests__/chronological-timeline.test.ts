import { ChronologicalTimeline } from '../chronological-timeline';
import { TimelineEvent } from '../timeline-event';
import type { TimelineEventData } from '../timeline-event-data';

describe('Chronological timeline', () => {
  const mockData = {} as TimelineEventData;

  it('returns the next valid start time', () => {
    const sut = new ChronologicalTimeline();
    expect(sut.nextEarliestStartTime).toBe(0);

    sut.addEvent(new TimelineEvent(sut.nextEarliestStartTime, 5, mockData));
    expect(sut.nextEarliestStartTime).toBe(5);
  });

  it('throws an error when trying to add a new event with a start time earlier than the latest event', () => {
    const sut = new ChronologicalTimeline();
    sut.addEvent(new TimelineEvent(5, 7, mockData));

    expect(() => {
      sut.addEvent(new TimelineEvent(3, 7, mockData));
    }).toThrow();
  });
});
