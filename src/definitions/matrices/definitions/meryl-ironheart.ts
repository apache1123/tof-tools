import type { MatrixBuffDefinition } from "../../types/matrix/matrix-buff-definition";
import type { MatrixDefinition } from "../../types/matrix/matrix-definition";

const attackBuff4pcBase = {
  id: "Meryl Ironheart 4pc ATK",
  displayName: "Meryl Ironheart 4pc ATK",
  description: "Increase volt ATK when Siege Edge is equipped",
  cooldown: 0,
  requirements: { teamRequirements: { anyWeapon: ["Meryl Ironheart"] } },
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  minMatrixPieces: 4,
} as const satisfies Partial<MatrixBuffDefinition>;

export const merylIronheart = {
  id: "Meryl Ironheart",
  displayName: "Meryl Ironheart",
  buffs: [
    {
      // TODO:
      id: "Meryl Ironheart 2pc",
      displayName: "Meryl Ironheart 2pc",
      description:
        "(Assuming max stacks) Each time Chain Static is triggered, increase crit damage by 6% for 5, stacking up to 4 times",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Meryl Ironheart"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 2,
      critDamageBuffs: [{ value: 0.24 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },

    {
      ...attackBuff4pcBase,
      attackPercentBuffs: [{ value: 0.21, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 0 },
    },
    {
      ...attackBuff4pcBase,
      attackPercentBuffs: [{ value: 0.24, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 1 },
    },
    {
      ...attackBuff4pcBase,
      attackPercentBuffs: [{ value: 0.27, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 2, maxStarRequirement: 2 },
    },
    {
      ...attackBuff4pcBase,
      attackPercentBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 3 },
    },
    {
      id: "Meryl Ironheart 4pc Crit Rate",
      displayName: "Meryl Ironheart 4pc Crit Rate",
      description: "+7% crit rate when Fortitude Resonance is triggered",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Fortitude" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      minMatrixPieces: 4,
      critRateBuffs: [{ value: 0.07 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 3 },
    },
  ],
} as const satisfies MatrixDefinition;
