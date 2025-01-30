import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

// TODO: only applies to matrix equipped weapon
const buff2pcBase = {
  id: "Scylla 2pc",
  displayName: "Scylla 2pc",
  description: "Increases crit DMG for the equipped weapon",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const scylla = {
  id: "Scylla",
  displayName: "Scylla",
  buffs: [
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.13 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.16 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.19 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.23 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
