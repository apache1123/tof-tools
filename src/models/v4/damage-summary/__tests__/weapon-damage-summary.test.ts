import { Damage } from '../../damage/damage';
import { WeaponDamageSummary } from '../weapon-damage-summary';

describe('WeaponDamageSummary', () => {
  it('returns total damage correctly', () => {
    const sut = new WeaponDamageSummary();
    sut.attackTypeDamageSummaries.normal.elementalTypeDamages.Altered =
      new Damage(10, 20);
    sut.attackTypeDamageSummaries.dodge.elementalTypeDamages.Frost = new Damage(
      50,
      100
    );

    expect(sut.totalDamage).toEqual(new Damage(60, 120));
  });

  it('adds correctly', () => {
    const sut1 = new WeaponDamageSummary();
    sut1.attackTypeDamageSummaries.normal.elementalTypeDamages.Altered =
      new Damage(5, 10);
    sut1.attackTypeDamageSummaries.dodge.elementalTypeDamages.Flame =
      new Damage(10, 20);

    const sut2 = new WeaponDamageSummary();
    sut2.attackTypeDamageSummaries.dodge.elementalTypeDamages.Flame =
      new Damage(50, 100);

    const sutResult = sut1.add(sut2);
    expect(sutResult.attackTypeDamageSummaries.normal.totalDamage).toEqual(
      new Damage(5, 10)
    );
    expect(sutResult.attackTypeDamageSummaries.dodge.totalDamage).toEqual(
      new Damage(60, 120)
    );

    expect(sutResult).not.toBe(sut1);
    expect(sutResult).not.toBe(sut2);
  });
});
