import type { ElementalType } from "../definitions/elemental-type";
import { sum } from "../utils/math-utils";

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

  private readonly elementalResistances: Record<ElementalType, number>;

  public get sumOfAllResistances(): number {
    return sum(...Object.values(this.elementalResistances)).toNumber();
  }

  public getElementalResistance(element: ElementalType): number {
    return this.elementalResistances[element];
  }

  public setElementalResistance(element: ElementalType, value: number) {
    this.elementalResistances[element] = value;
  }
}
