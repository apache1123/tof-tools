import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Agleia 2pc frost attack",
  displayName: "Agleia 2pc frost attack",
  description: "Increases Frost ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const frostDamageBuff4pcBase = {
  id: "Agleia 4pc frost damage",
  displayName: "Agleia 4pc frost damage",
  description: "Increases Frost DMG by 30%/34%/38%/42%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const agleia = {
  id: "Agleia",
  displayName: "Agleia",
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
      ...frostDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...frostDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.34, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...frostDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.38, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...frostDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.42, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Agleia 4pc Agleia equipped buff",
      displayName: "Agleia 4pc Agleia equipped buff",
      description:
        "Equipping Chrono Heart grants an additional 15% Final Damage",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Agleia"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      finalDamageBuffs: [{ value: 0.15 }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
