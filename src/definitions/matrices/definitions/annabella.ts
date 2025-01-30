import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Annabella 2pc",
  displayName: "Annabella 2pc",
  description: "Increase crit rate after hitting with a flame weapon",
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
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

// TODO: only after a crit
const buff4pcBase = {
  id: "Annabella 4pc",
  displayName: "Annabella 4pc",
  description:
    "When equipping 2 or more flame weapons, increases crit DMG after landing a crit",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      elementalWeapons: {
        numOfElementalWeapons: [
          { element: "Flame", numOfWeapons: 2 },
          { element: "Flame", numOfWeapons: 3 },
        ],
      },
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const annabella = {
  id: "Annabella",
  displayName: "Annabella",
  buffs: [
    {
      ...buff2pcBase,
      critRateBuffs: [{ value: 0.04 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      critRateBuffs: [{ value: 0.04 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      critRateBuffs: [{ value: 0.048 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      critRateBuffs: [{ value: 0.048 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      ...buff4pcBase,
      critDamageBuffs: [{ value: 0.12 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff4pcBase,
      critDamageBuffs: [{ value: 0.14 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff4pcBase,
      critDamageBuffs: [{ value: 0.16 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff4pcBase,
      critDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
