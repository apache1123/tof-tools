import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

// TODO: Fiona skills are specifically buffed by trait
export const fiona: PartialSimulacrumTrait = {
  id: "Fiona",
  displayName: "Fiona",
  buffs: [
    {
      id: "fiona-trait",
      displayName: "Fiona trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
  ],
};
