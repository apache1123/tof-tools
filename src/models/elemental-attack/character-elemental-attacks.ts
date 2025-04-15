import type {
  CoreElementalType,
  ElementalType,
} from "../../definitions/elemental-type";
import { ElementalAttack } from "./elemental-attack";

export class CharacterElementalAttacks {
  public constructor(
    private readonly elementalAttacks: Record<
      CoreElementalType,
      ElementalAttack
    >,
  ) {}

  public getAllElementalAttacks(): ElementalAttack[] {
    return [
      ...Object.values(this.elementalAttacks),
      this.getElementalAttack("Altered"),
    ];
  }

  public getElementalAttack(element: ElementalType): ElementalAttack {
    if (element === "Altered") {
      const highestElementalAttack = this.getHighestElementalAttack();
      return new ElementalAttack(
        "Altered",
        highestElementalAttack.baseAttack,
        highestElementalAttack.totalAttack,
      );
    }

    return this.elementalAttacks[element];
  }

  public setElementalAttack(
    element: CoreElementalType,
    elementalAttack: ElementalAttack,
  ) {
    this.elementalAttacks[element] = elementalAttack;
  }

  private getHighestElementalAttack() {
    return Object.values(this.elementalAttacks).reduce((result, curr) =>
      curr.totalAttack >= result.totalAttack ? curr : result,
    );
  }
}
