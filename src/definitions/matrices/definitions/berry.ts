import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Berry 2pc physical attack",
  displayName: "Berry 2pc physical attack",
  description: "Increases Physical ATK by 28%/30%/32%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const physicalDamageBuff4pcBase = {
  id: "Berry 4pc physical damage",
  displayName: "Berry 4pc physical damage",
  description: "Increases Physical DMG by 26%/30%/34%/38%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const berry = {
  id: "Berry",
  displayName: "Berry",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.34, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...physicalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.26, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...physicalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...physicalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.34, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...physicalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.38, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Berry 4pc Berry equipped buff",
      displayName: "Berry 4pc Berry equipped buff",
      description: "Grants an extra 17% Final Damage when Charon is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Berry"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      finalDamageBuffs: [{ value: 0.17 }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
