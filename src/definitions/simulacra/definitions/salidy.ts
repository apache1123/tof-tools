import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const salidy: PartialSimulacrumTrait = {
  id: "Salidy",
  displayName: "Salidy",
  buffs: [
    {
      id: "Salidy trait - final damage",
      displayName: "Salidy trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
  ],
};
