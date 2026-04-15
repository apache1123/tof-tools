import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const berry: PartialSimulacrumTrait = {
  id: "Berry",
  displayName: "Berry",
  buffs: [
    {
      id: "Berry trait - final damage",
      displayName: "Berry trait - final damage",
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
