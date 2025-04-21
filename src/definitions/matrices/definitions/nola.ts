import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Nola 2pc",
  displayName: "Nola 2pc",
  description:
    "When Nola's weapon is equipped, increase all ATK, works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      anyWeapon: [
        "Nola",
        "Nola (Altered)",
        "Nola (Flame-Physical)",
        "Nola (Frost-Volt)",
        "Nola (Physical-Flame)",
        "Nola (Volt-Frost)",
      ],
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const nola = {
  id: "Nola",
  displayName: "Nola",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.24,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.28,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
