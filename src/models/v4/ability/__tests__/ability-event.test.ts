import { TimeInterval } from '../../time-interval/time-interval';
import { AbilityEvent } from '../ability-event';

// TODO: out of date
describe.skip('Ability event', () => {
  describe('cooldown', () => {
    it('should not be on cooldown if there is no cooldown', () => {
      const sut = new AbilityEvent(new TimeInterval(0, 10), 0);
      expect(sut.isOnCooldown(0)).toBe(false);
      expect(sut.isOnCooldown(5)).toBe(false);
      expect(sut.isOnCooldown(10)).toBe(false);
    });

    it('should be on cooldown if there is a cooldown', () => {
      const sut = new AbilityEvent(new TimeInterval(10, 20), 5);
      expect(sut.isOnCooldown(5)).toBe(false);
      expect(sut.isOnCooldown(10)).toBe(true);
      expect(sut.isOnCooldown(14)).toBe(true);
      expect(sut.isOnCooldown(15)).toBe(false);
      expect(sut.isOnCooldown(20)).toBe(false);
    });
  });
});
