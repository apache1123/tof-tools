import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Skull 2pc flame attack",
  displayName: "Skull 2pc flame attack",
  description: "Increases Flame ATK by 28%/30%/32%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Skull 4pc final damage",
  displayName: "Skull 4pc final damage",
  description: "Increases Final DMG by 22%/26%/30%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const skull = {
  id: "Skull",
  displayName: "Skull",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.34, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.22 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.26 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.3 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.34 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Skull 4pc Skull equipped buff",
      displayName: "Skull 4pc Skull equipped buff",
      description:
        "Increases Flame Damage by 17% when equipped with Silverfang",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Skull"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.17, elementalTypes: ["Flame"] }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
