import type { WeaponElementalType } from '../../../definitions/elemental-type';
import { sum } from '../../../utils/math-utils';

export class ElementalResistances {
  private readonly _elementalResistances: Record<WeaponElementalType, number>;

  public constructor(
    elementalResistances: Record<WeaponElementalType, number>
  ) {
    this._elementalResistances = elementalResistances;
  }

  public getElementalResistance(element: WeaponElementalType): number {
    return this._elementalResistances[element];
  }

  public setElementalResistance(element: WeaponElementalType, value: number) {
    this._elementalResistances[element] = value;
  }

  public getSumOfAllResistances(): number {
    return sum(...Object.values(this._elementalResistances)).toNumber();
  }
}
