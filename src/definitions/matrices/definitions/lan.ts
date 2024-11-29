import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Lan 2pc",
  displayName: "Lan 2pc",
  description:
    "Equip at least 1 flame weapon increases flame ATK, works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      elementalWeapons: {
        numOfElementalWeapons: [
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
} as const satisfies Partial<MatrixBuffDefinition>;

export const lan = {
  id: "Lan",
  displayName: "Lan",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.06, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.07, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.08, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.09, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
