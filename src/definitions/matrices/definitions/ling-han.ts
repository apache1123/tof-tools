import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff4pcBase = {
  id: "Ling Han 4pc",
  displayName: "Ling Han 4pc",
  description:
    "Increase all ATK when Ling Han's weapon is equipped, works off-hand",
  cooldown: 0,
  requirements: { teamRequirements: { anyWeapon: ["Ling Han"] } },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lingHan = {
  id: "Ling Han",
  displayName: "Ling Han",
  buffs: [
    {
      ...buff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.12,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
