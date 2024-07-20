import { mock } from 'jest-mock-extended';

import { Attack } from '../attack';
import type { AttackDefinition } from '../attack-definition';

describe('Attack', () => {
  describe('resolving elemental type', () => {
    it('returns the correct elemental type, when there are no special conditions', () => {
      const sut = newAttack({ defaultElementalType: 'Altered' });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Altered');
    });

    it("returns the correct elemental type, when the attack's elemental type follows the active weapon", () => {
      const sut = newAttack({
        followCurrentWeaponElementalType: true,
        defaultElementalType: 'Flame',
      });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Altered');
    });

    it("returns the correct elemental type, when the attack's elemental type follows the previous weapon", () => {
      const sut = newAttack({
        followLastWeaponElementalType: true,
        defaultElementalType: 'Altered',
      });
      const event = sut.trigger();
      expect(event?.elementalType).toBe('Frost');
    });

    function newAttack(elementalType: AttackDefinition['elementalType']) {
      return new Attack(
        mock<Attack['weapon']>(),
        mock<AttackDefinition>({
          elementalType,
          triggeredBy: { playerInput: true },
        }),
        mock<Attack['timeline']>(),
        mock<Attack['tickTracker']>(),
        mock<Attack['weaponTracker']>({
          activeWeapon: { damageElement: 'Altered' },
          previousWeapon: { damageElement: 'Frost' },
        }),
        mock<Attack['charge']>(),
        mock<Attack['abilityEventTimeCalculator']>()
      );
    }
  });
});
