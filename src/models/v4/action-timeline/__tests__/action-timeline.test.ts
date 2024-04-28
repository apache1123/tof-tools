import type { Action } from '../../action-timeline/action';
import { ActionTimeline } from '../../action-timeline/action-timeline';

describe('Action timeline', () => {
  const timelineDuration = 100;

  describe('action cooldowns', () => {
    it('should not be on cooldown if there are no actions', () => {
      const sut = new ActionTimeline(timelineDuration);
      expect(sut.isActionOnCooldownAt(0)).toBe(false);
    });

    it('should be on cooldown of there is an action with cooldown', () => {
      const sut = new ActionTimeline(timelineDuration);
      sut.addAction(
        newFakeAction({ startTime: 0, endTime: 10, cooldownEndsAt: 5 })
      );
      expect(sut.isActionOnCooldownAt(0)).toBe(true);
      expect(sut.isActionOnCooldownAt(2)).toBe(true);
      expect(sut.isActionOnCooldownAt(5)).toBe(false);
      expect(sut.isActionOnCooldownAt(10)).toBe(false);
    });
  });
});

function newFakeAction({
  startTime,
  endTime,
  cooldownEndsAt,
}: Pick<Action, 'startTime' | 'endTime' | 'cooldownEndsAt'>): Action {
  return { startTime, endTime, cooldownEndsAt } as Action;
}
