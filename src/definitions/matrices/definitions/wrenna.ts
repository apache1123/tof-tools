import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Wrenna 2pc volt attack",
  displayName: "Wrenna 2pc volt attack",
  description: "Increases Volt Attack by 28%/30%/32%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Wrenna 4pc final damage",
  displayName: "Wrenna 4pc final damage",
  description: "Increases Final Damage by 26%/30%/34%/38%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const wrenna = {
  id: "Wrenna",
  displayName: "Wrenna",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.34, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.26 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.3 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.34 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.38 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Wrenna 4pc Wrenna equipped buff",
      displayName: "Wrenna 4pc Wrenna equipped buff",
      description: "Grants 10% Volt Damage when Skybreaker is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Wrenna"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Volt"] }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
