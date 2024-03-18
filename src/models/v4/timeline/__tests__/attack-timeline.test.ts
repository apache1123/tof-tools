import type { Attack } from '../../attack';
import { AttackEvent } from '../attack-event';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const mockAttack = {
    weapon: {},
    attackDefinition: {
      duration: 7,
    },
  } as Attack;

  it('returns the next valid start time', () => {
    const sut = new AttackTimeline();
    expect(sut.nextEarliestStartTime).toBe(0);

    sut.addEvent(new AttackEvent(sut.nextEarliestStartTime, mockAttack));
    expect(sut.nextEarliestStartTime).toBe(7);
  });

  it('throws an error when trying to add a new event with a start time earlier than the latest event', () => {
    const sut = new AttackTimeline();
    sut.addEvent(new AttackEvent(5, mockAttack));

    expect(() => {
      sut.addEvent(new AttackEvent(3, mockAttack));
    }).toThrow();
  });
});
