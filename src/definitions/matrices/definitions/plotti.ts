import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const buff2pcBase = {
  id: "Plotti 2pc",
  displayName: "Plotti 2pc",
  description: "Increase flame and physical ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const plotti = {
  id: "Plotti",
  displayName: "Plotti",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.19, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.21, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.23, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.25, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
