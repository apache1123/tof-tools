import type { WeaponName } from '../../../definitions/weapons/weapon-definitions';
import { filterOutUndefined } from '../../../utils/array-utils';
import type { Serializable } from '../../persistable';
import { Damage } from '../damage/damage';
import type { DamageSummaryDto } from './dtos/damage-summary-dto';
import { WeaponDamageSummary } from './weapon-damage-summary';

export class DamageSummary implements Serializable<DamageSummaryDto> {
  public readonly weaponDamageSummaries = new Map<
    WeaponName,
    WeaponDamageSummary
  >();

  public constructor(
    public duration: number,
    ...weaponNames: WeaponName[]
  ) {
    for (const weaponName of weaponNames) {
      this.weaponDamageSummaries.set(weaponName, new WeaponDamageSummary());
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

  /** Adds another damage summary. Returns another instance without modifying the originals */
  public add(damageSummary: DamageSummary): DamageSummary {
    const aggregatedWeaponNames = new Set([
      ...this.weaponDamageSummaries.keys(),
      ...damageSummary.weaponDamageSummaries.keys(),
    ]);

    const result = new DamageSummary(
      this.duration + damageSummary.duration,
      ...aggregatedWeaponNames
    );

    for (const weaponName of aggregatedWeaponNames) {
      const thisWeaponDamageSummary =
        this.weaponDamageSummaries.get(weaponName);
      const otherWeaponDamageSummary =
        damageSummary.weaponDamageSummaries.get(weaponName);

      filterOutUndefined([
        thisWeaponDamageSummary,
        otherWeaponDamageSummary,
      ]).forEach((weaponDamageSummary) => {
        result.weaponDamageSummaries.set(
          weaponName,
          result.weaponDamageSummaries
            .get(weaponName)
            ?.add(weaponDamageSummary) ?? weaponDamageSummary
        );
      });
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
