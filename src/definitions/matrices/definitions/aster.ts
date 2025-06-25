import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Aster 2pc physical attack",
  displayName: "Aster 2pc physical attack",
  description: "Increases Physical ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const damageBuff4pcBase = {
  id: "Aster 4pc all elemental damage",
  displayName: "Aster 4pc all elemental damage",
  description: "Increases all elemental damage by 21%/25%/29%/33%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const aster = {
  id: "Aster",
  displayName: "Aster",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "Aster 2pc final damage",
      displayName: "Aster 2pc final damage",
      description:
        "Boost final damage by 3% per target killed, up to 2 stacks, lasting for 60s. (Assuming full stacks)",
      cooldown: 0,
      duration: 60000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 2,
      minMatrixPieces: 2,
      finalDamageBuffs: [{ value: 0.03 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },

    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [
        {
          value: 0.21,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [
        {
          value: 0.25,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [
        {
          value: 0.29,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [
        {
          value: 0.33,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Aster 4pc extra final damage",
      displayName: "Aster 4pc extra final damage",
      description: "Equip Twin Stars to increase Final Damage by an extra 11%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Aster"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      finalDamageBuffs: [{ value: 0.11 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
