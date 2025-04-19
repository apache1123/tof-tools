import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Ruby 2pc",
  displayName: "Ruby 2pc",
  description: "Increase flame ATK after casting skill",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const ruby = {
  id: "Ruby",
  displayName: "Ruby",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.08, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.15, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
