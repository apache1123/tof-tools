import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const yuLan: PartialSimulacrumTrait = {
  id: "Yu Lan",
  displayName: "Yu Lan",
  buffs: [
    {
      id: "yulan-trait",
      displayName: "Yu Lan trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    // TODO: Yu Lan MA/sweeping forms
  ],
};
