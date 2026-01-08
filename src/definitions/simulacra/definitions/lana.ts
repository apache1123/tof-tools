import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const lana: PartialSimulacrumTrait = {
  id: "Lana",
  displayName: "Lana",
  buffs: [
    {
      id: "Lana trait - final damage",
      displayName: "Lana trait - final damage",
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
