import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Fenrir 2pc",
  displayName: "Fenrir 2pc",
  description: "Increases crit DMG, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const fenrir = {
  id: "Fenrir",
  displayName: "Fenrir",
  buffs: [
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.14 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.15 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.16 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      critDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
