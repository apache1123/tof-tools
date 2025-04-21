import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Antoria 2pc",
  displayName: "Antoria 2pc",
  description: "Increases Volt Attack by 24%/26%/28%/30%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const damageBuff4pcBase = {
  id: "Antoria 4pc volt damage",
  displayName: "Antoria 4pc volt damage",
  description: "Increases Volt Damage by 18%/22%/26%/30%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const antoria = {
  id: "Antoria",
  displayName: "Antoria",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.24, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.18, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.22, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.26, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Antoria 4pc final damage",
      displayName: "Antoria 4pc final damage",
      description: "When equipping Requiem, increases Final Damage by 12%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Antoria"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      finalDamageBuffs: [{ value: 0.12 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
