import { Damage } from '../damage';

describe('Damage', () => {
  it('calculates the damage multiplier correctly', () => {
    const sut = new Damage(21.8, 114.3);
    expect(sut.damageMultiplier).toBeCloseTo(5.24);
  });

  it('adds correctly', () => {
    const damage1 = new Damage(21.8, 114.3);
    const damage2 = new Damage(5.7, 40.1);
    const damage3 = new Damage(1.3, 10.1);

    const sut = damage1.add(damage2).add(damage3);

    expect(sut.baseDamage).toBe(28.8);
    expect(sut.finalDamage).toBe(164.5);
    expect(sut.damageMultiplier).toBeCloseTo(5.71);
  });
});
