import type { AttackCommand } from '../../attack/attack-command';
import { AttackEvent } from '../attack-event';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const mockAttackCommand = {
    weapon: {},
    attackDefinition: {
      duration: 7,
    },
  } as AttackCommand;

  const timelineDuration = 100;

  it('returns the next valid start time', () => {
    const sut = new AttackTimeline(timelineDuration);
    expect(sut.nextEarliestStartTime).toBe(0);

    sut.addEvent(new AttackEvent(sut.nextEarliestStartTime, mockAttackCommand));
    expect(sut.nextEarliestStartTime).toBe(7);
  });

  it('throws an error when trying to add a new event with a start time earlier than the latest event', () => {
    const sut = new AttackTimeline(timelineDuration);
    sut.addEvent(new AttackEvent(5, mockAttackCommand));

    expect(() => {
      sut.addEvent(new AttackEvent(3, mockAttackCommand));
    }).toThrow();
  });
});
