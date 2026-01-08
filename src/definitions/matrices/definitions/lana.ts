import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Lana 2pc all attack",
  displayName: "Lana 2pc all attack",
  description: "Increases all ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Lana 4pc final damage",
  displayName: "Lana 4pc final damage",
  description: "Increases Final DMG by 13%/17%/21%/25%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lana = {
  id: "Lana",
  displayName: "Lana",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.28,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.32,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.13 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.17 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.21 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.25 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Lana 4pc Lana equipped buff",
      displayName: "Lana 4pc Lana equipped buff",
      description:
        "When equipped with Evolution Cube, increases all Elemental Damage by 6% and Crit Damage by 19%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Lana"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [
        {
          value: 0.06,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      critDamageBuffs: [{ value: 0.19 }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
