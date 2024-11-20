// import BigNumber from "bignumber.js";
//
// import { damageCalculatorDefaults } from "../../../definitions/damage-calculator-defaults";
// import type { CoreElementalType } from "../../../definitions/elemental-type";
// import { keysOf } from "../../../utils/object-utils";
// import { GearSet } from "../../gear-set/gear-set";
// import { Loadout } from "../../loadout/loadout";
// import { Team } from "../../team/team";
//
// // TODO: support altered as main elemental type. Requires changes to Loadout
// export function getLoadoutWithDefaultStats(
//   mainElementalType: CoreElementalType,
// ) {
//   const {
//     wandererLevel,
//     mainElementBaseAttack,
//     otherElementBaseAttack,
//     critFlat,
//     hp,
//     sumOfAllResistances,
//   } = damageCalculatorDefaults;
//
//   const loadoutStats = new UserInputLoadoutStats();
//
//   const loadout = new Loadout(
//     "loadout",
//     new Team(),
//     GearSet.create(),
//   );
//
//   keysOf(loadoutStats.elementalBaseAttacks).forEach((element) => {
//     loadoutStats;
//     loadoutStats.setElementalBaseAttack(
//       element,
//       element === mainElementalType
//         ? mainElementBaseAttack
//         : otherElementBaseAttack,
//     );
//   });
//
//   loadoutStats.critRateFlat = critFlat;
//   loadoutStats.hp = hp;
//
//   const elementalResistances = loadoutStats.elementalResistances;
//   const resistanceValue = BigNumber(sumOfAllResistances)
//     .div(Object.keys(elementalResistances).length)
//     .toNumber();
//   keysOf(elementalResistances).forEach((elementalType) => {
//     elementalResistances[elementalType] = resistanceValue;
//   });
//
//   return loadout;
// }
