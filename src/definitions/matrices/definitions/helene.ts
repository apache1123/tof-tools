import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Helene 2pc frost attack",
  displayName: "Helene 2pc frost attack",
  description: "Increases Frost ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Helene 4pc final damage",
  displayName: "Helene 4pc final damage",
  description: "Increases Final DMG by 18%/22%/26%/30%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const helene = {
  id: "Helene",
  displayName: "Helene",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.22 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.26 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...finalDamageBuff4pcBase,
      finalDamageBuffs: [{ value: 0.3 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Helene 4pc Helene equipped buff",
      displayName: "Helene 4pc Helene equipped buff",
      description: "Equipping Pollux grants an additional 11% Frost Damage",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Helene"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Frost"] }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
