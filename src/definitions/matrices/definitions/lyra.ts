import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

// TODO: triggered by matrix equipped weapon only
const buff2pcBase = {
  id: "Lyra 2pc",
  displayName: "Lyra 2pc",
  description: "Increase ATK on equipped weapon",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lyra = {
  id: "Lyra",
  displayName: "Lyra",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.13,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.17,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.21,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.25,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
