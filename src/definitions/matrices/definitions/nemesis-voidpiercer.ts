import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const buff2pcBase = {
  id: "Nemesis Voidpiercer 2pc",
  displayName: "Nemesis Voidpiercer 2pc",
  description:
    "Increase all ATK when equipped with Star of Oblivion. Works off-hand",
  cooldown: 0,
  requirements: {
    teamRequirements: {
      anyWeapon: [
        "Nemesis Voidpiercer",
        "Nemesis Voidpiercer (Altered)",
        "Nemesis Voidpiercer (Flame-Physical)",
        "Nemesis Voidpiercer (Frost-Volt)",
        "Nemesis Voidpiercer (Physical-Flame)",
        "Nemesis Voidpiercer (Volt-Frost)",
      ],
    },
  },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

const buff4pcFinalDamageBase = {
  id: "Nemesis Voidpiercer 4pc final damage",
  displayName: "Nemesis Voidpiercer 4pc",
  description: "Increase final damage. Works off-hand",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const nemesisVoidpiercer = {
  id: "Nemesis Voidpiercer",
  displayName: "Nemesis Voidpiercer",
  buffs: [
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.26,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.28,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff2pcBase,
      attackPercentBuffs: [
        {
          value: 0.32,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      ...buff4pcFinalDamageBase,
      finalDamageBuffs: [{ value: 0.1 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff4pcFinalDamageBase,
      finalDamageBuffs: [{ value: 0.14 }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff4pcFinalDamageBase,
      finalDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff4pcFinalDamageBase,
      finalDamageBuffs: [{ value: 0.22 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "Nemesis Voidpiercer 4pc on-weapon",
      displayName: "Nemesis Voidpiercer 4pc",
      description:
        "When equipped with Star of Oblivion, increase final damage by 8% and crit damage by 15%. Works off-hand",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: [
            "Nemesis Voidpiercer",
            "Nemesis Voidpiercer (Altered)",
            "Nemesis Voidpiercer (Flame-Physical)",
            "Nemesis Voidpiercer (Frost-Volt)",
            "Nemesis Voidpiercer (Physical-Flame)",
            "Nemesis Voidpiercer (Volt-Frost)",
          ],
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      finalDamageBuffs: [{ value: 0.08 }],
      critDamageBuffs: [{ value: 0.15 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
