import type { EffectDefinition } from '../../effect-definition';
import { EffectEvent } from '../effect-event';
import { EffectTimeline } from '../effect-timeline';

describe('Effect timeline', () => {
  const mockEffectDefinition = {} as EffectDefinition;

  describe('adding an event that overlaps with an existing one', () => {
    it('splits the events into smaller events with the correct stacks', () => {
      const sut = new EffectTimeline();
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 2));
      sut.addEvent(new EffectEvent(5, 10, mockEffectDefinition, 2));

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
      const sut = new EffectTimeline();
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 1));
      sut.addEvent(new EffectEvent(5, 10, mockEffectDefinition, 1));

      expect(sut.events.length).toBe(1);
      expect(sut.events[0].endTime).toBe(15);
    });

    it("doesn't add a new event if the two events are of the exact same time period and the stack count cannot be increased further", () => {
      const sut = new EffectTimeline();
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 1));
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 1));

      expect(sut.events.length).toBe(1);
      expect(sut.events[0].startTime).toBe(0);
      expect(sut.events[0].endTime).toBe(10);
      expect(sut.events[0].stacks).toBe(1);
    });

    it("doesn't add a new event if the two events are of the exact same time period, but increase the stack count of the existing event if it can be increased further", () => {
      const sut = new EffectTimeline();
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 3, 1));
      sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 3, 2));

      expect(sut.events.length).toBe(1);
      expect(sut.events[0].startTime).toBe(0);
      expect(sut.events[0].endTime).toBe(10);
      expect(sut.events[0].stacks).toBe(3);
    });
  });

  it('adds a new event when there are no previous events', () => {
    const sut = new EffectTimeline();
    sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition));

    expect(sut.events.length).toBe(1);
    expect(sut.events[0].startTime).toBe(0);
    expect(sut.events[0].endTime).toBe(10);
  });

  it('adds a new event onto the previous event (merges them) when the new event starts when the previous event ends and the two have the same number of stacks', () => {
    const sut = new EffectTimeline();
    sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 2, 1));
    sut.addEvent(new EffectEvent(10, 10, mockEffectDefinition, 2, 1));

    expect(sut.events.length).toBe(1);
    expect(sut.events[0].startTime).toBe(0);
    expect(sut.events[0].endTime).toBe(20);
  });

  it('adds a new event when the new event starts when the previous event ends but the two do not have the same number of stacks', () => {
    const sut = new EffectTimeline();
    sut.addEvent(new EffectEvent(0, 10, mockEffectDefinition, 2, 1));
    sut.addEvent(new EffectEvent(10, 10, mockEffectDefinition, 2, 2));

    expect(sut.events.length).toBe(2);
    expect(sut.events[1].startTime).toBe(10);
    expect(sut.events[1].endTime).toBe(20);
  });

  it('does not add new event if the last event is still on cooldown', () => {
    const sut = new EffectTimeline();
    const eventWithCooldown = new EffectEvent(0, 10, mockEffectDefinition);
    eventWithCooldown.cooldown = 5;
    sut.addEvent(eventWithCooldown);

    expect(sut.events.length).toBe(1);
    expect(sut.lastEvent?.startTime).toBe(0);
    expect(sut.lastEvent?.endTime).toBe(10);

    sut.addEvent(new EffectEvent(3, 10, mockEffectDefinition));
    expect(sut.events.length).toBe(1);
    expect(sut.lastEvent?.startTime).toBe(0);
    expect(sut.lastEvent?.endTime).toBe(10);

    sut.addEvent(new EffectEvent(7, 10, mockEffectDefinition));
    expect(sut.events.length).toBe(1);
    expect(sut.lastEvent?.startTime).toBe(0);
    expect(sut.lastEvent?.endTime).toBe(17);
  });
});
