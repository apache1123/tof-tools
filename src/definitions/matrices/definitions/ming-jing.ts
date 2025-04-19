import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Ming Jing 2pc",
  displayName: "Ming Jing 2pc",
  description:
    "Increase physical ATK and flame ATK when at least 1 physical or flame weapon is equipped, works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      elementalWeapons: {
        numOfElementalWeapons: [
          { element: "Physical", numOfWeapons: 1 },
          { element: "Physical", numOfWeapons: 2 },
          { element: "Physical", numOfWeapons: 3 },
          { element: "Flame", numOfWeapons: 1 },
          { element: "Flame", numOfWeapons: 2 },
          { element: "Flame", numOfWeapons: 3 },
        ],
      },
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const mingJing = {
  id: "Ming Jing",
  displayName: "Ming Jing",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.14, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.16, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.18, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.2, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      // TODO:
      id: "Ming Jing 4pc",
      displayName: "Ming Jing 4pc",
      description:
        "Increase physical ATK and flame ATK for 30 seconds after applying snake bite, works off-hand",
      cooldown: 0,
      duration: 30000,
      requirements: { teamRequirements: { anyWeapon: ["Ming Jing"] } },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      minMatrixPieces: 4,
      attackPercentBuffs: [
        { value: 0.09, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
