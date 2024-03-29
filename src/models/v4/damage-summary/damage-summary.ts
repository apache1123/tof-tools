import type { WeaponName } from '../../../constants/weapon-definitions';
import type { Weapon } from '../../weapon';
import { Damage } from './damage';
import { WeaponDamageSummary } from './weapon-damage-summary';

export class DamageSummary {
  public readonly weaponDamageSummaries = new Map<
    WeaponName,
    WeaponDamageSummary
  >();

  public constructor(...weapons: Weapon[]) {
    for (const weapon of weapons) {
      this.weaponDamageSummaries.set(
        weapon.definition.id,
        new WeaponDamageSummary()
      );
    }
  }

  public get totalDamage(): Damage {
    return Array.from(this.weaponDamageSummaries.values()).reduce(
      (result, weaponDamageSummary) =>
        result.add(weaponDamageSummary.totalDamage),
      new Damage(0, 0)
    );
  }

  /** Adds another damage summary. The weapons of the two damage summaries must be the same. Returns another instance without modifying the originals */
  public add(damageSummary: DamageSummary): DamageSummary {
    for (const weaponName of this.weaponDamageSummaries.keys()) {
      if (!damageSummary.weaponDamageSummaries.has(weaponName)) {
        throw new Error(
          'Cannot add two DamageSummary instances with different weapons'
        );
      }
    }

    const result = new DamageSummary();

    for (const [weaponName, thisWeaponDamageSummary] of this
      .weaponDamageSummaries) {
      const otherWeaponDamageSummary =
        damageSummary.weaponDamageSummaries.get(weaponName);
      if (otherWeaponDamageSummary) {
        result.weaponDamageSummaries.set(
          weaponName,
          thisWeaponDamageSummary.add(otherWeaponDamageSummary)
        );
      }
    }

    return result;
  }
}
