import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const buff2pcBase = {
  id: "Anka 2pc",
  displayName: "Anka 2pc",
  description: "Increases physical ATK, works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const anka = {
  id: "Anka",
  displayName: "Anka",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.22, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.24, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "Anka 4pc",
      displayName: "Anka 4pc",
      description:
        "When Poppin' Stick is equipped, increase crit damage by 15%, works off-hand",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Anka"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      critDamageBuffs: [{ value: 0.15 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
