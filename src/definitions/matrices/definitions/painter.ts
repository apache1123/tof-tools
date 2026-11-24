import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Painter 2pc flame attack",
  displayName: "Painter 2pc flame attack",
  description: "Increases Flame Attack by 28%/30%/32%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const finalDamageBuff4pcBase = {
  id: "Painter 4pc final damage",
  displayName: "Painter 4pc final damage",
  description: "Increases Final Damage by 22%/26%/30%/34%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const benedictionBuff4pcBase = {
  id: "Painter 4pc Painter equipped Benediction",
  displayName: "Painter 4pc Painter equipped Benediction",
  description:
    "When Benediction Resonance is active, increases Base Attack by 4,000/8,000/12,000/16,000 for 30s across the team upon casting Cage of Fate with Imperial Staff",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      anyWeapon: ["Painter"],
      weaponResonance: { is: "Benediction" },
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: {}, // Triggered by Cage of Fate
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const painter = {
  id: "Painter",
  displayName: "Painter",
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
      id: "Painter 4pc Painter equipped non-Benediction",
      displayName: "Painter 4pc Painter equipped non-Benediction",
      description:
        "When non-Benediction Resonance is active, increases Flame Damage by 12% and Crit Damage by 12% when Imperial Staff is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Painter"],
          weaponResonance: { isNot: "Benediction" },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Flame"] }],
      critDamageBuffs: [{ value: 0.12 }],
    },

    {
      ...benedictionBuff4pcBase,
      baseAttackBuffs: [
        { value: 4000, elementalTypes: ["Flame", "Frost", "Physical", "Volt"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...benedictionBuff4pcBase,
      baseAttackBuffs: [
        { value: 8000, elementalTypes: ["Flame", "Frost", "Physical", "Volt"] },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...benedictionBuff4pcBase,
      baseAttackBuffs: [
        {
          value: 12000,
          elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...benedictionBuff4pcBase,
      baseAttackBuffs: [
        {
          value: 16000,
          elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies PartialMatrixDefinition;
