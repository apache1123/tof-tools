import type { Attack } from '../attack';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const timelineDuration = 100;

  describe('adding attack', () => {
    it('throws an error when trying to add a new event with a start time earlier than the start time of the latest event', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttack(newFakeAttack({ startTime: 5, endTime: 7 }));

      expect(() => {
        sut.addAttack(newFakeAttack({ startTime: 3, endTime: 7 }));
      }).toThrow();
    });

    it('cuts the previous attack short if a new one is added before it has ended', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttack(newFakeAttack({ startTime: 0, endTime: 10 }));
      sut.addAttack(newFakeAttack({ startTime: 5, endTime: 10 }));

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
}: Pick<Attack, 'startTime' | 'endTime'>): Attack {
  return { startTime, endTime } as Attack;
}
