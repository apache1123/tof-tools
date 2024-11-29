import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

export const rei = {
  id: "Rei",
  displayName: "Rei",
  buffs: [
    {
      id: "Rei 4pc",
      displayName: "Rei 4pc",
      description:
        "After dealing damage with Rei's weapon, increase volt and frost ATK by 12% for 5 seconds",
      cooldown: 0,
      duration: 5000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { hitOfWeapon: "Rei" },
      maxStacks: 1,
      minMatrixPieces: 4,
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Volt", "Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
  ],
} as const satisfies MatrixDefinition;
