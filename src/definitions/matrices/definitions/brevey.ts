import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const noneBenedictionBuff4pcBase = {
  id: "brevey-matrix-4pc-non-benediction",
  displayName: "Brevey 4pc",
  description: "When benediction resonance is not active, increase all ATK",
  cooldown: 0,
  requirements: {
    teamRequirements: { weaponResonance: { isNot: "Benediction" } },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

const benedictionBuff4pcBase = {
  id: "brevey-matrix-4pc-benediction",
  displayName: "Brevey 4pc",
  description: "When benediction resonance is active, increase all ATK",
  cooldown: 0,
  requirements: {
    teamRequirements: { weaponResonance: { is: "Benediction" } },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const brevey = {
  id: "Brevey",
  displayName: "Brevey",
  buffs: [
    {
      ...noneBenedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...noneBenedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...noneBenedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.34,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...noneBenedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.38,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      ...benedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.14,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...benedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.16,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...benedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.18,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...benedictionBuff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.2,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
