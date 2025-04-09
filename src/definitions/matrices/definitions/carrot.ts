import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const attackBuff2pcBase = {
  id: "Carrot 2pc",
  displayName: "Carrot 2pc",
  description: "Increases flame attack by 26%/28%/30%/32%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 2,
} as const satisfies Partial<MatrixBuffDefinition>;

const damageBuff4pcBase = {
  id: "Carrot 4pc flame damage",
  displayName: "Carrot 4pc flame damage",
  description: "Increases flame damage by 24%/28%/32%/36%",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const carrot = {
  id: "Carrot",
  displayName: "Carrot",
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
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.24, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.28, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.32, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...damageBuff4pcBase,
      elementalDamageBuffs: [{ value: 0.36, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },

    {
      id: "Carrot 4pc final damage",
      displayName: "Carrot 4pc final damage",
      description:
        "Increases final damage by an extra 10% for 30s after casting Carrot Kombat",
      cooldown: 0,
      duration: 30000,
      requirements: { teamRequirements: { anyWeapon: ["Carrot"] } },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      minMatrixPieces: 4,
      finalDamageBuffs: [{ value: 0.1 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
