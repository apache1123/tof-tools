import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const noneBenedictionBuff2pcBase = {
  id: "gray-fox-matrix-2pc-non-benediction",
  displayName: "Gray Fox 4pc",
  description:
    "When non-Benediction Resonance is active, increase frost ATK, works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: { weaponResonance: { isNot: "Benediction" } },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

const benedictionBuff2pcBase = {
  id: "gray-fox-matrix-2pc-benediction",
  displayName: "Gray Fox 2pc",
  description:
    "When Benediction Resonance is active, increase all ATK, works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: { weaponResonance: { is: "Benediction" } },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

export const grayFox = {
  id: "Gray Fox",
  displayName: "Gray Fox",
  buffs: [
    {
      ...noneBenedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.24,
          elementalTypes: ["Frost"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...noneBenedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Frost"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...noneBenedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.28,
          elementalTypes: ["Frost"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...noneBenedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Frost"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      ...benedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.24,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...benedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...benedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.28,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...benedictionBuff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "gray-fox-matrix-4pc",
      displayName: "Gray Fox 4pc",
      description:
        "After using Spacetime Spark and while Benediction Resonance is active, increase the Wanderer and nearby teammates' crit rate by an additional 20% and crit damage by an additional 12%",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      minMatrixPieces: 4,
      critRateBuffs: [
        {
          value: 0.2,
        },
      ],
      critDamageBuffs: [
        {
          value: 0.12,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
