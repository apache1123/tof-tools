import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Lyncis 2pc",
  displayName: "Lyncis 2pc",
  description: "Increases frost attack by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const damageBuff4pcBase = {
  id: "Lyncis 4pc frost damage",
  displayName: "Lyncis 4pc frost damage",
  description: "Increases frost damage by 18%/22%/26%/30%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lyncis = {
  id: "Lyncis",
  displayName: "Lyncis",
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
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.18, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.22, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.26, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Lyncis 4pc extra frost damage",
      displayName: "Lyncis 4pc extra frost damage",
      description:
        "Lyncis gains 10% extra frost damage for 30s after casting the skill",
      cooldown: 0,
      duration: 30000,
      requirements: { teamRequirements: { anyWeapon: ["Lyncis"] } },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      minMatrixPieces: 4,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
