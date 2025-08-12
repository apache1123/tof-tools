import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Hipper 2pc volt attack",
  displayName: "Hipper 2pc volt attack",
  description: "Increases Volt ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const damageBuff4pcBase = {
  id: "Hipper 4pc volt damage",
  displayName: "Hipper 4pc volt damage",
  description: "Increases volt damage by 11%/13%/15%/17%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const hipperBuff4pcBase = {
  id: "Hipper 4pc Hipper equipped buffs",
  displayName: "Hipper 4pc Hipper equipped buffs",
  description:
    "When AF-010 Servion is equipped, also increases crit damage by 11%/13%/15%/17% and final damage by 11%",
  cooldown: 0,
  requirements: { teamRequirements: { anyWeapon: ["Hipper"] } },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
  finalDamageBuffs: [{ value: 0.11 }],
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const hipper = {
  id: "Hipper",
  displayName: "Hipper",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.13, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.15, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.17, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...hipperBuff4pcBase,
      critDamageBuffs: [{ value: 0.11 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...hipperBuff4pcBase,
      critDamageBuffs: [{ value: 0.13 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...hipperBuff4pcBase,
      critDamageBuffs: [{ value: 0.15 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...hipperBuff4pcBase,
      critDamageBuffs: [{ value: 0.17 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
