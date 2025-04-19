import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Asurada 2pc",
  displayName: "Asurada 2pc",
  description: "Increase flame ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const asurada = {
  id: "Asurada",
  displayName: "Asurada",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
