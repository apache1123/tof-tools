import type { WeaponElementalType } from "../../../definitions/elemental-type";
import { keysOf } from "../../../utils/object-utils";
import { Damage } from "../damage/damage";

export class ElementalDamageSummary {
  public readonly elementalTypeDamages: Record<WeaponElementalType, Damage> = {
    Altered: new Damage(0, 0),
    Flame: new Damage(0, 0),
    Frost: new Damage(0, 0),
    Physical: new Damage(0, 0),
    Volt: new Damage(0, 0),
  };

  public get totalDamage(): Damage {
    return keysOf(this.elementalTypeDamages).reduce(
      (result, elementalType) =>
        result.add(this.elementalTypeDamages[elementalType]),
      new Damage(0, 0),
    );
  }

  /** Adds another elemental damage summary. Returns another instance without modifying the originals */
  public add(
    elementalDamageSummary: ElementalDamageSummary,
  ): ElementalDamageSummary {
    const result = new ElementalDamageSummary();

    keysOf(this.elementalTypeDamages).forEach((elementalType) => {
      result.elementalTypeDamages[elementalType] = this.elementalTypeDamages[
        elementalType
      ].add(elementalDamageSummary.elementalTypeDamages[elementalType]);
    });

    return result;
  }
}
