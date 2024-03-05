import { Timeline } from '../v4/timeline';
import { TimelineEvent } from '../v4/timeline-event';

describe('Timeline', () => {
  it('returns the next valid start time', () => {
    const sut = new Timeline();
    expect(sut.nextEarliestStartTime).toBe(0);

    sut.addEvent(new TimelineEvent(sut.nextEarliestStartTime, 5));
    expect(sut.nextEarliestStartTime).toBe(5);
  });

  it('throws an error when trying to add a new event with a start time earlier than the latest event', () => {
    const sut = new Timeline();
    sut.addEvent(new TimelineEvent(5, 7));

    expect(() => {
      sut.addEvent(new TimelineEvent(3, 7));
    }).toThrow();
  });
});
