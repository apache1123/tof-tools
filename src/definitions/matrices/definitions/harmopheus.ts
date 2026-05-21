import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Harmopheus 2pc volt attack",
  displayName: "Harmopheus 2pc volt attack",
  description: "Increases Volt ATK by 28%/30%/32%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const voltDamageBuff4pcBase = {
  id: "Harmopheus 4pc volt damage",
  displayName: "Harmopheus 4pc volt damage",
  description: "Increases Volt DMG by 23%/27%/31%/35%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const harmopheus = {
  id: "Harmopheus",
  displayName: "Harmopheus",
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
      ...voltDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.23, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...voltDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.27, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...voltDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.31, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...voltDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.35, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Harmopheus 4pc Harmopheus equipped buff",
      displayName: "Harmopheus 4pc Harmopheus equipped buff",
      description: "Grants a 13% Volt Damage Boost when Neverrest is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Harmopheus"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.13, elementalTypes: ["Volt"] }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
