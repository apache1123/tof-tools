import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

export const mimi = {
  id: "Huang (Mimi)",
  displayName: "Huang (Mimi)",
  buffs: [
    {
      id: "mimi-matrix-4pc",
      displayName: "Huang (Mimi) 4pc",
      description:
        "After using Azure Moon/Soaring Dragon, increase crit DMG for 30 seconds. Works off-hand.",
      cooldown: 0,
      duration: 30000,
      requirements: { teamRequirements: { anyWeapon: ["Huang (Mimi)"] } },
      canBePlayerTriggered: false,
      // TODO: triggered by Azure Moon/Soaring Dragon
      triggeredBy: { abilityStart: [""] },
      maxStacks: 1,
      minMatrixPieces: 4,
      critDamageBuffs: [{ value: 0.06 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
