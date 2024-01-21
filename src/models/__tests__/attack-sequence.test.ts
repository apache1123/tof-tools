import type { AttackDefinition } from '../attack-definition';
import { AttackSequence } from '../attack-sequence';
import type { Weapon } from '../weapon';

describe('AttackSequence', () => {
  it('can add attacks in turn with correct start times', () => {
    const sut = new AttackSequence();

    const weapon = {} as Weapon;
    const firstAttack = {
      duration: 5,
    } as AttackDefinition;
    sut.addAttack(weapon, firstAttack);

    const secondAttack = {
      duration: 7,
    } as AttackDefinition;
    sut.addAttack(weapon, secondAttack);

    const thirdAttack = {
      duration: 8,
    } as AttackDefinition;
    sut.addAttack(weapon, thirdAttack);

    expect(sut.attacks[0].startTime).toBe(0);
    expect(sut.attacks[1].startTime).toBe(5);
    expect(sut.attacks[2].startTime).toBe(12);
  });
});
