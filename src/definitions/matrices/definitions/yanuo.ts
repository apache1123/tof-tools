import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

export const yanuo = {
  id: "Yanuo",
  displayName: "Yanuo",
  buffs: [
    {
      id: "Yanuo 2pc",
      displayName: "Yanuo 2pc",
      description: "Increase frost and volt ATK, works off-hand",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 2,
      attackPercentBuffs: [{ value: 0.05, elementalTypes: ["Frost", "Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
