import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const buff2pcBase = {
  id: "Asuka 2pc",
  displayName: "Asuka 2pc",
  description: "Increase physical and flame ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const asuka = {
  id: "Asuka",
  displayName: "Asuka",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.2, elementalTypes: ["Physical", "Flame"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.22, elementalTypes: ["Physical", "Flame"] },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.24, elementalTypes: ["Physical", "Flame"] },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.26, elementalTypes: ["Physical", "Flame"] },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
