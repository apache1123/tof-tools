import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Crow 2pc",
  displayName: "Crow 2pc",
  description: "Increase crit DMG to targets under 60% HP",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const crow = {
  id: "Crow",
  displayName: "Crow",
  buffs: [
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.144 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.216 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.252 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
