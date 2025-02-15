import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import { filterOutUndefined } from "../../utils/array-utils";
import { Damage } from "../damage/damage";
import type { Serializable } from "../persistable";
import type { DamageSummaryDto } from "./dtos/damage-summary-dto";
import { WeaponDamageSummary } from "./weapon-damage-summary";

export class DamageSummary implements Serializable<DamageSummaryDto> {
  public constructor(
    public duration: number,
    ...weaponIds: WeaponDefinitionId[]
  ) {
    for (const weaponId of weaponIds) {
      this.weaponDamageSummaries.set(weaponId, new WeaponDamageSummary());
    }
  }

  public readonly weaponDamageSummaries = new Map<
    WeaponDefinitionId,
    WeaponDamageSummary
  >();

  public get totalDamage(): Damage {
    return Array.from(this.weaponDamageSummaries.values()).reduce(
      (result, weaponDamageSummary) =>
        result.add(weaponDamageSummary.totalDamage),
      new Damage(0, 0),
    );
  }

  public get damagePercentageByWeapon(): {
    weaponId: WeaponDefinitionId;
    percentage: number;
  }[] {
    const totalFinalDamage = this.totalDamage.finalDamage;
    return Array.from(this.weaponDamageSummaries.entries()).map(
      ([weaponId, weaponDamageSummary]) => ({
        weaponId,
        percentage:
          weaponDamageSummary.totalDamage.finalDamage / totalFinalDamage,
      }),
    );
  }

  /** Adds another damage summary. Returns another instance without modifying the originals */
  public add(damageSummary: DamageSummary): DamageSummary {
    const aggregatedWeaponIds = new Set([
      ...this.weaponDamageSummaries.keys(),
      ...damageSummary.weaponDamageSummaries.keys(),
    ]);

    const result = new DamageSummary(
      this.duration + damageSummary.duration,
      ...aggregatedWeaponIds,
    );

    for (const weaponId of aggregatedWeaponIds) {
      const thisWeaponDamageSummary = this.weaponDamageSummaries.get(weaponId);
      const otherWeaponDamageSummary =
        damageSummary.weaponDamageSummaries.get(weaponId);

      filterOutUndefined([
        thisWeaponDamageSummary,
        otherWeaponDamageSummary,
      ]).forEach((weaponDamageSummary) => {
        result.weaponDamageSummaries.set(
          weaponId,
          result.weaponDamageSummaries
            .get(weaponId)
            ?.add(weaponDamageSummary) ?? weaponDamageSummary,
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
        ([weaponId, weaponDamageSummary]) => ({
          ...weaponDamageSummary.toDto(),
          weaponId,
          percentageOfTotalDamage:
            this.damagePercentageByWeapon.find(
              (damagePercentageItem) =>
                damagePercentageItem.weaponId === weaponId,
            )?.percentage ?? 0,
        }),
      ),
      duration,
      version: 1,
    };
  }
}
