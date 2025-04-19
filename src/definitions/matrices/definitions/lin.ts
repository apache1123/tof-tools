import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Lin 2pc",
  displayName: "Lin 2pc",
  description: "Increase ATK on hit, very small ramp-up",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { hitOfAnyAttack: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lin = {
  id: "Lin",
  displayName: "Lin",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.105,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.13,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.155,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.18,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
