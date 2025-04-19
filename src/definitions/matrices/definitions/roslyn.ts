import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

// TODO:
const buff4pcBase = {
  id: "Roslyn 4pc",
  displayName: "Roslyn 4pc",
  description: "After entering Bitter Cold, increase frost ATK for 40 seconds",
  cooldown: 0,
  duration: 40000,
  requirements: { teamRequirements: { anyWeapon: ["Roslyn"] } },
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const roslyn = {
  id: "Roslyn",
  displayName: "Roslyn",
  buffs: [
    {
      ...buff4pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [{ value: 0.34, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [{ value: 0.36, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
