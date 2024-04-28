import type { AttackAction } from '../attack-action';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const timelineDuration = 100;

  describe('adding attack', () => {
    it('throws an error when trying to add a new action with a start time earlier than the start time of the latest action', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttackAction(newFakeAttack({ startTime: 5, endTime: 7 }));

      expect(() => {
        sut.addAttackAction(newFakeAttack({ startTime: 3, endTime: 7 }));
      }).toThrow();
    });

    it('cuts the previous attack action short if a new one is added before it has ended', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttackAction(newFakeAttack({ startTime: 0, endTime: 10 }));
      sut.addAttackAction(newFakeAttack({ startTime: 5, endTime: 10 }));

      expect(sut.actions[0].startTime).toBe(0);
      expect(sut.actions[0].endTime).toBe(5);
      expect(sut.actions[1].startTime).toBe(5);
      expect(sut.actions[1].endTime).toBe(10);
    });
  });
});

function newFakeAttack({
  startTime,
  endTime,
}: Pick<AttackAction, 'startTime' | 'endTime'>): AttackAction {
  return { startTime, endTime } as AttackAction;
}
