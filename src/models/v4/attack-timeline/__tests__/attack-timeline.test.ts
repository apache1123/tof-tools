import type { AttackEvent } from '../attack-event';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const timelineDuration = 100;

  describe('adding attack', () => {
    it('throws an error when trying to add a new event with a start time earlier than the start time of the latest event', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttackEvent(newFakeAttack({ startTime: 5, endTime: 7 }));

      expect(() => {
        sut.addAttackEvent(newFakeAttack({ startTime: 3, endTime: 7 }));
      }).toThrow();
    });

    it('cuts the previous attack event short if a new one is added before it has ended', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttackEvent(newFakeAttack({ startTime: 0, endTime: 10 }));
      sut.addAttackEvent(newFakeAttack({ startTime: 5, endTime: 10 }));

      expect(sut.events[0].startTime).toBe(0);
      expect(sut.events[0].endTime).toBe(5);
      expect(sut.events[1].startTime).toBe(5);
      expect(sut.events[1].endTime).toBe(10);
    });
  });
});

function newFakeAttack({
  startTime,
  endTime,
}: Pick<AttackEvent, 'startTime' | 'endTime'>): AttackEvent {
  return { startTime, endTime } as AttackEvent;
}
