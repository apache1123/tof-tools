import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Nemesis 2pc",
  displayName: "Nemesis 2pc",
  description:
    "Whilst being healed, increase volt attack. Can be applied to/by party members",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const nemesis = {
  id: "Nemesis",
  displayName: "Nemesis",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.08, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.15, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
