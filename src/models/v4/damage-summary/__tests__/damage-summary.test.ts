import type { Weapon as WeaponDefinition } from '../../../../definitions/types/weapon/weapon';
import { Weapon } from '../../../weapon';
import { Damage } from '../../damage/damage';
import { DamageSummary } from '../damage-summary';

// TODO: out of date
describe.skip('DamageSummary', () => {
  const duration = 1000;
  const mockWeapon1 = new Weapon({ id: 'Alyss' } as WeaponDefinition);
  const mockWeapon2 = new Weapon({ id: 'Annabella' } as WeaponDefinition);

  it('returns total damage correctly', () => {
    const sut = new DamageSummary(duration, mockWeapon1, mockWeapon2);
    const weaponDamageSummary1 = sut.weaponDamageSummaries.get(mockWeapon1.id);
    if (weaponDamageSummary1) {
      weaponDamageSummary1.attackTypeDamageSummaries.normal.elementalTypeDamages.Altered =
        new Damage(10, 20);
    }

    const weaponDamageSummary2 = sut.weaponDamageSummaries.get(mockWeapon2.id);
    if (weaponDamageSummary2) {
      weaponDamageSummary2.attackTypeDamageSummaries.dodge.elementalTypeDamages.Flame =
        new Damage(50, 100);
    }

    expect(sut.totalDamage).toEqual(new Damage(60, 120));
  });

  it('adds correctly', () => {
    const sut1 = new DamageSummary(duration, mockWeapon1, mockWeapon2);
    const weaponDamageSummary1 = sut1.weaponDamageSummaries.get(mockWeapon1.id);
    if (weaponDamageSummary1) {
      weaponDamageSummary1.attackTypeDamageSummaries.normal.elementalTypeDamages.Altered =
        new Damage(10, 20);
    }

    const sut2 = new DamageSummary(duration, mockWeapon1, mockWeapon2);
    const weaponDamageSummary2 = sut2.weaponDamageSummaries.get(mockWeapon1.id);
    if (weaponDamageSummary2) {
      weaponDamageSummary2.attackTypeDamageSummaries.dodge.elementalTypeDamages.Flame =
        new Damage(50, 100);
    }

    const sutResult = sut1.add(sut2);
    expect(sutResult.totalDamage).toEqual(new Damage(60, 120));
    expect(sutResult.duration).toBe(duration * 2);

    expect(sutResult).not.toBe(sut1);
    expect(sutResult).not.toBe(sut2);
  });
});
