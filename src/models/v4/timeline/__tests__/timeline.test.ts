import { Timeline } from '../timeline';
import { TimelineAction } from '../timeline-action';

describe('Timeline', () => {
  it('returns correct events overlapping with the specified start and end time', () => {
    const sut = new Timeline(100);

    // Test against the period of 6 to 11.
    const event1 = new TimelineAction(0, 5); // out
    const event2 = new TimelineAction(1, 6); // out
    const event3 = new TimelineAction(2, 7); // in
    const event4 = new TimelineAction(5, 25); // in
    const event5 = new TimelineAction(6, 6); // in
    const event6 = new TimelineAction(7, 18); // in
    const event7 = new TimelineAction(9, 23); // in
    const event8 = new TimelineAction(11, 11); // out
    const event9 = new TimelineAction(11, 12); // out
    const event10 = new TimelineAction(12, 29); // out

    sut.addAction(event1);
    sut.addAction(event2);
    sut.addAction(event3);
    sut.addAction(event4);
    sut.addAction(event5);
    sut.addAction(event6);
    sut.addAction(event7);
    sut.addAction(event8);
    sut.addAction(event9);
    sut.addAction(event10);

    const overlappingEvents = sut.getActionsOverlappingPeriod(6, 11);

    expect(overlappingEvents).not.toContain(event1);
    expect(overlappingEvents).not.toContain(event2);
    expect(overlappingEvents).toContain(event3);
    expect(overlappingEvents).toContain(event4);
    expect(overlappingEvents).toContain(event5);
    expect(overlappingEvents).toContain(event6);
    expect(overlappingEvents).toContain(event7);
    expect(overlappingEvents).not.toContain(event8);
    expect(overlappingEvents).not.toContain(event9);
    expect(overlappingEvents).not.toContain(event10);
  });

  it('returns correct events overlapping with the specified time', () => {
    const sut = new Timeline(100);

    const event1 = new TimelineAction(0, 5);
    const event2 = new TimelineAction(3, 10);
    const event3 = new TimelineAction(10, 15);

    sut.addAction(event1);
    sut.addAction(event2);
    sut.addAction(event3);

    expect(sut.getActionsOverlappingTime(0)).toContain(event1);
    expect(sut.getActionsOverlappingTime(0)).not.toContain(event2);
    expect(sut.getActionsOverlappingTime(0)).not.toContain(event3);

    expect(sut.getActionsOverlappingTime(3)).toContain(event1);
    expect(sut.getActionsOverlappingTime(3)).toContain(event2);
    expect(sut.getActionsOverlappingTime(3)).not.toContain(event3);

    expect(sut.getActionsOverlappingTime(5)).not.toContain(event1);
    expect(sut.getActionsOverlappingTime(5)).toContain(event2);
    expect(sut.getActionsOverlappingTime(5)).not.toContain(event3);

    expect(sut.getActionsOverlappingTime(7)).not.toContain(event1);
    expect(sut.getActionsOverlappingTime(7)).toContain(event2);
    expect(sut.getActionsOverlappingTime(7)).not.toContain(event3);

    expect(sut.getActionsOverlappingTime(10)).not.toContain(event1);
    expect(sut.getActionsOverlappingTime(10)).not.toContain(event2);
    expect(sut.getActionsOverlappingTime(10)).toContain(event3);

    expect(sut.getActionsOverlappingTime(16)).not.toContain(event1);
    expect(sut.getActionsOverlappingTime(16)).not.toContain(event2);
    expect(sut.getActionsOverlappingTime(16)).not.toContain(event3);
  });
});
