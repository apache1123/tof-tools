import type { WeaponElementalType } from "../../definitions/elemental-type";
import { sum } from "../../utils/math-utils";

export class ElementalResistances {
  public constructor() {
    this.elementalResistances = {
      Altered: 0,
      Flame: 0,
      Frost: 0,
      Physical: 0,
      Volt: 0,
    };
  }

  private readonly elementalResistances: Record<WeaponElementalType, number>;

  public get sumOfAllResistances(): number {
    return sum(...Object.values(this.elementalResistances)).toNumber();
  }

  public getElementalResistance(element: WeaponElementalType): number {
    return this.elementalResistances[element];
  }

  public setElementalResistance(element: WeaponElementalType, value: number) {
    this.elementalResistances[element] = value;
  }
}
