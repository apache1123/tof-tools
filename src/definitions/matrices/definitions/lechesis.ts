import type { PartialMatrixBuffAbilityDefinition } from "../../types/matrix/partial-matrix-buff-ability-definition";
import type { PartialMatrixDefinition } from "../../types/matrix/partial-matrix-definition";

const attackBuff2pcBase = {
  id: "Lechesis 2pc all attack",
  displayName: "Lechesis 2pc all attack",
  description: "Increases All ATK by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

const lechesisBuff4pcBase = {
  id: "Lechesis 4pc Lechesis equipped buffs",
  displayName: "Lechesis 4pc Lechesis equipped buffs",
  description:
    "Increases Final DMG by 16%/20%/24%/28% when Eternal Salvation is equipped",
  cooldown: 0,
  requirements: { teamRequirements: { anyWeapon: ["Lechesis"] } },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<PartialMatrixBuffAbilityDefinition>;

export const lechesis = {
  id: "Lechesis",
  displayName: "Lechesis",
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
      ...lechesisBuff4pcBase,
      finalDamageBuffs: [{ value: 0.16 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...lechesisBuff4pcBase,
      finalDamageBuffs: [{ value: 0.2 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...lechesisBuff4pcBase,
      finalDamageBuffs: [{ value: 0.24 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...lechesisBuff4pcBase,
      finalDamageBuffs: [{ value: 0.28 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Lechesis 4pc non-Benediction buffs",
      displayName: "Lechesis 4pc non-Benediction buffs",
      description:
        "Activate non-Benediction Resonance to gain an additional 14% All Elemental Damage boost",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { isNot: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
      elementalDamageBuffs: [
        {
          value: 0.14,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
  ],
} as const satisfies PartialMatrixDefinition;
