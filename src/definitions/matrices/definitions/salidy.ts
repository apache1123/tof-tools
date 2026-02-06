import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Salidy 2pc flame attack",
  displayName: "Salidy 2pc flame attack",
  description: "Increases Flame ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Salidy 4pc flame damage",
  displayName: "Salidy 4pc flame damage",
  description: "Increases Flame DMG by 22%/26%/30%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const salidy = {
  id: "Salidy",
  displayName: "Salidy",
  buffs: [
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.26, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.28, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff2pcBase,
      attackPercentBuffs: [{ value: 0.32, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "Salidy 2pc Salidy buff",
      displayName: "Salidy 2pc Salidy buff",
      description:
        "Increases Bloodfin's damage by 300% within 10s of casting Deadly Devour",
      cooldown: 0,
      requirements: {
        teamRequirements: { anyWeapon: ["Salidy"] },
        activeWeapon: { is: "Salidy" },
        // activeBuff: "", TODO:
      },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true }, // TODO: this should be triggered on the ability cast
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      finalDamageBuffs: [{ value: 3, restrictedTo: { weapon: "Salidy" } }],
    },

    {
      ...finalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.22, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...finalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.26, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...finalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...finalDamageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.34, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Salidy 4pc Salidy equipped buff",
      displayName: "Salidy 4pc Salidy equipped buff",
      description:
        "When Bloodfin is equipped, grants an extra 17% Flame Damage bonus",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Salidy"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.17, elementalTypes: ["Flame"] }],
    },
  ],
} as const satisfies PartialMatrixDefinition;
