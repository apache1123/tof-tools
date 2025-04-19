import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

// TODO:
const buff2pcBase = {
  id: "Frigg 2pc",
  displayName: "Frigg 2pc",
  description: "Increase frost ATK when switching between frost weapons",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      elementalWeapons: {
        numOfElementalWeapons: [
          { element: "Frost", numOfWeapons: 2 },
          { element: "Frost", numOfWeapons: 3 },
        ],
      },
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const frigg = {
  id: "Frigg",
  displayName: "Frigg",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.08, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.15, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
