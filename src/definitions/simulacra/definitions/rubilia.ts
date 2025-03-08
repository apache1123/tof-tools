import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const rubilia: SimulacrumTrait = {
  id: "Rubilia",
  displayName: "Rubilia",
  buffs: [
    {
      id: "rubilia-trait-1-volt",
      displayName: "Rubilia trait - 1 volt weapon",
      description:
        "Increase volt damage by 8% for every 1 volt weapon equipped",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.08, elementalTypes: ["Volt"] }],
    },
    {
      id: "rubilia-trait-2-volt",
      displayName: "Rubilia trait - 2 volt weapons",
      description:
        "Increase volt damage by 8% for every 1 volt weapon equipped",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.16, elementalTypes: ["Volt"] }],
    },
    {
      id: "rubilia-trait-3-volt",
      displayName: "Rubilia trait - 3 volt weapons",
      description:
        "Increase volt damage by 8% for every 1 volt weapon equipped",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.24, elementalTypes: ["Volt"] }],
    },
  ],
};
