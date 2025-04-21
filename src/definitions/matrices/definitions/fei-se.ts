import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Fei Se 2pc",
  displayName: "Fei Se 2pc",
  description:
    "Increase ATK after using a flame skill or discharge for 30s, works off hand.",
  cooldown: 0,
  duration: 30000,
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
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const feiSe = {
  id: "Fei Se",
  displayName: "Fei Se",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.14,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.16,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.18,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.2,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
