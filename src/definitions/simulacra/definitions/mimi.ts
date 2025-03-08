import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const mimi: SimulacrumTrait = {
  id: "Huang (Mimi)",
  displayName: "Huang (Mimi)",
  buffs: [
    {
      id: "mimi-trait",
      displayName: "Mimi trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "mimi-trait-triple-volt",
      displayName: "Mimi trait - Triple volt",
      description:
        "When equipped with 3 volt weapons, increase volt damage by 6%",
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
      elementalDamageBuffs: [{ value: 0.06, elementalTypes: ["Volt"] }],
    },
    // TODO: crit rate duration buff
  ],
};
