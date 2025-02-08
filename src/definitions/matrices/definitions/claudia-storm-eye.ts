import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const buff2pcBase = {
  id: "Claudia Storm Eye 2pc",
  displayName: "Claudia Storm Eye 2pc",
  description: "Increase physical ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const claudiaStormEye = {
  id: "Claudia Storm Eye",
  displayName: "Claudia Storm Eye",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.24, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
