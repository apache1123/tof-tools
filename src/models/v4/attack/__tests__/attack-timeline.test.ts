import type { AttackType } from '../../../../constants/attack-type';
import { Attack } from '../attack';
import type { AttackDamageModifiers } from '../attack-definition';
import { AttackTimeline } from '../attack-timeline';

describe('Attack timeline', () => {
  const timelineDuration = 100;
  const mockDamageModifiers = {} as AttackDamageModifiers;
  const attackType: AttackType = 'normal';

  it('throws an error when trying to add a new event with a start time earlier than the latest event', () => {
    const sut = new AttackTimeline(timelineDuration);
    sut.addAttack(
      new Attack(5, 7, 0, 'Altered', mockDamageModifiers, attackType)
    );

    expect(() => {
      sut.addAttack(
        new Attack(3, 7, 0, 'Altered', mockDamageModifiers, attackType)
      );
    }).toThrow();
  });

  describe('attack cooldowns', () => {
    it('should not be on cooldown if there are no attacks', () => {
      const sut = new AttackTimeline(timelineDuration);
      expect(sut.isAttackOnCooldownAt(0)).toBe(false);
    });

    it('should be on cooldown of there is an attack with cooldown', () => {
      const sut = new AttackTimeline(timelineDuration);
      sut.addAttack(
        new Attack(0, 10, 5, 'Altered', mockDamageModifiers, attackType)
      );
      expect(sut.isAttackOnCooldownAt(0)).toBe(true);
      expect(sut.isAttackOnCooldownAt(2)).toBe(true);
      expect(sut.isAttackOnCooldownAt(5)).toBe(false);
      expect(sut.isAttackOnCooldownAt(10)).toBe(false);
    });
  });
});
