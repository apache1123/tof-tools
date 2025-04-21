import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Yan Miao 2pc",
  displayName: "Yan Miao 2pc",
  description: "Increase physical and flame ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const yanMiao = {
  id: "Yan Miao",
  displayName: "Yan Miao",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.19, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.21, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.23, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        { value: 0.25, elementalTypes: ["Flame", "Physical"] },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
