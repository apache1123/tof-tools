import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const nola: SimulacrumTrait = {
  id: "Nola",
  displayName: "Nola",
  buffs: [
    {
      id: "Nola trait",
      displayName: "Nola trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },

    {
      id: "Nola trait - 1 altered",
      displayName: "Nola trait - 1 altered",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.05,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
    {
      id: "Nola trait - 2 altered",
      displayName: "Nola trait - 2 altered",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.1,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
    {
      id: "Nola trait - 3 altered",
      displayName: "Nola trait - 3 altered",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
  ],
};
