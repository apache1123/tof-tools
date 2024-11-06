import type {
  CoreElementalType,
  WeaponElementalType,
} from "../../definitions/elemental-type";
import { keysOf } from "../../utils/object-utils";
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
      ? this.getHighestElementalAttack().elementalAttack
      : this._elementalAttacks[element];
  }

  public setElementalAttack(
    element: CoreElementalType,
    elementalAttack: ElementalAttack,
  ) {
    this._elementalAttacks[element] = elementalAttack;
  }

  public getHighestElementalAttack(): {
    element: CoreElementalType;
    elementalAttack: ElementalAttack;
  } {
    const element = this.getHighestElementalAttackElement();
    return {
      element,
      elementalAttack: this._elementalAttacks[element],
    };
  }

  private getHighestElementalAttackElement() {
    return keysOf(this._elementalAttacks).reduce((highestElement, curr) =>
      this._elementalAttacks[curr].totalAttack >=
      this._elementalAttacks[highestElement].totalAttack
        ? curr
        : highestElement,
    );
  }
}
