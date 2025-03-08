import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const lingHan: SimulacrumTrait = {
  id: "Ling Han",
  displayName: "Ling Han",
  buffs: [
    {
      id: "linghan-trait",
      displayName: "Ling Han trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "linghan-trait-1-frost",
      displayName: "Ling Han trait - 1 frost weapon",
      description:
        "For every frost weapon equipped, increase frost damage by 2.5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.025, elementalTypes: ["Frost"] }],
    },
    {
      id: "linghan-trait-2-frost",
      displayName: "Ling Han trait - 2 frost weapons",
      description:
        "For every frost weapon equipped, increase frost damage by 2.5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.05, elementalTypes: ["Frost"] }],
    },
    {
      id: "linghan-trait-3-frost",
      displayName: "Ling Han trait - 3 frost weapons",
      description:
        "For every frost weapon equipped, increase frost damage by 2.5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.075, elementalTypes: ["Frost"] }],
    },
    // TODO: 3 frost extra charge gained; deal passive attack after frost weapon skill or discharge
  ],
};
