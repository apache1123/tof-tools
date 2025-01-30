import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const buff4pcBase = {
  id: "Tsubasa 4pc",
  displayName: "Tsubasa 4pc",
  description:
    "Upon a headshot or hitting the target with Icewind Arrow: Piercing Shot, increase ATK for 8 seconds",
  cooldown: 0,
  duration: 8000,
  requirements: { teamRequirements: { anyWeapon: ["Tsubasa"] } },
  canBePlayerTriggered: false,
  triggeredBy: {},
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const tsubasa = {
  id: "Tsubasa",
  displayName: "Tsubasa",
  buffs: [
    {
      ...buff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.18,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.21,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...buff4pcBase,
      attackPercentBuffs: [
        {
          value: 0.25,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
