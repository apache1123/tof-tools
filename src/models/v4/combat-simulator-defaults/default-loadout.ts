import BigNumber from "bignumber.js";

import { damageCalculatorDefaults } from "../../../definitions/damage-calculator-defaults";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import { keysOf } from "../../../utils/object-utils";
import { GearSet } from "../../gear-set";
import { Loadout } from "../../loadout";
import { Team } from "../../team/team";

// TODO: support altered as main elemental type. Requires changes to Loadout
export function getLoadoutWithDefaultStats(
  mainElementalType: CoreElementalType,
) {
  const {
    wandererLevel,
    mainElementBaseAttack,
    otherElementBaseAttack,
    critFlat,
    hp,
    sumOfAllResistances,
  } = damageCalculatorDefaults;

  const loadout = new Loadout(
    "loadout",
    mainElementalType,
    new Team(),
    new GearSet(),
    { characterLevel: wandererLevel },
  );

  const elementalAttacks = loadout.loadoutStats.elementalAttacks;
  elementalAttacks[mainElementalType].baseAttack = mainElementBaseAttack;
  keysOf(elementalAttacks)
    .filter((elementalType) => elementalType !== mainElementalType)
    .forEach((elementalType) => {
      elementalAttacks[elementalType].baseAttack = otherElementBaseAttack;
    });

  loadout.loadoutStats.critFlat = critFlat;
  loadout.loadoutStats.hp = hp;

  const elementalResistances = loadout.loadoutStats.elementalResistances;
  const resistanceValue = BigNumber(sumOfAllResistances)
    .div(Object.keys(elementalResistances).length)
    .toNumber();
  keysOf(elementalResistances).forEach((elementalType) => {
    elementalResistances[elementalType] = resistanceValue;
  });

  return loadout;
}
