import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const aster: PartialSimulacrumTrait = {
  id: "Aster",
  displayName: "Aster",
  buffs: [
    {
      id: "Aster trait - final damage",
      displayName: "Aster trait - final damage",
      description: "Increases final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
  ],
};
