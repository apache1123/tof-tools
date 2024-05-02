import type { WeaponName } from '../../../constants/weapons/weapon-definitions';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { Damage } from './damage';
import type { DamageSummaryDto } from './dtos/damage-summary-dto';
import { WeaponDamageSummary } from './weapon-damage-summary';

export class DamageSummary implements Serializable<DamageSummaryDto> {
  public readonly weaponDamageSummaries = new Map<
    WeaponName,
    WeaponDamageSummary
  >();

  public constructor(public duration: number, ...weapons: Weapon[]) {
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

  public get damagePercentageByWeapon(): {
    weaponName: WeaponName;
    percentage: number;
  }[] {
    const totalFinalDamage = this.totalDamage.finalDamage;
    return Array.from(this.weaponDamageSummaries.entries()).map(
      ([weaponName, weaponDamageSummary]) => ({
        weaponName,
        percentage:
          weaponDamageSummary.totalDamage.finalDamage / totalFinalDamage,
      })
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

    const result = new DamageSummary(this.duration + damageSummary.duration);

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

  public toDto(): DamageSummaryDto {
    const { totalDamage, weaponDamageSummaries, duration } = this;
    return {
      totalDamage: totalDamage.toDto(),
      damageByWeapon: [...weaponDamageSummaries.entries()].map(
        ([weaponName, weaponDamageSummary]) => ({
          ...weaponDamageSummary.toDto(),
          weaponName,
          percentageOfTotalDamage:
            this.damagePercentageByWeapon.find(
              (damagePercentageItem) =>
                damagePercentageItem.weaponName === weaponName
            )?.percentage ?? 0,
        })
      ),
      duration,
      version: 1,
    };
  }
}
