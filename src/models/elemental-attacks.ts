import type {
  CoreElementalType,
  WeaponElementalType,
} from "../definitions/elemental-type";
import type { ElementalAttack } from "./elemental-attack";

export class ElementalAttacks {
  private readonly _elementalAttacks: Record<
    CoreElementalType,
    ElementalAttack
  >;

  public constructor(
    elementalAttacks: Record<CoreElementalType, ElementalAttack>,
  ) {
    this._elementalAttacks = elementalAttacks;
  }

  public getElementalAttack(element: WeaponElementalType): ElementalAttack {
    return element === "Altered"
      ? this.getHighestElementalAttack()
      : this._elementalAttacks[element];
  }

  public setElementalAttack(
    element: CoreElementalType,
    elementalAttack: ElementalAttack,
  ) {
    this._elementalAttacks[element] = elementalAttack;
  }

  private getHighestElementalAttack(): ElementalAttack {
    return Object.values(this._elementalAttacks).reduce((result, curr) =>
      curr.totalAttack >= result.totalAttack ? curr : result,
    );
  }
}
