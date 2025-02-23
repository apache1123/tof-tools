import { damageCalculatorDefaults } from "../../definitions/damage-calculator-defaults";
import { Relics } from "../relics/relics";

export function getDefaultRelics() {
  const { makeAllRelicsMaxStars } = damageCalculatorDefaults;

  const relics = new Relics();
  if (makeAllRelicsMaxStars) relics.setAllRelicsToMaxStars();

  return relics;
}
