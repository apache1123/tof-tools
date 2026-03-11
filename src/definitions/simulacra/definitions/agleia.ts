import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const agleia: PartialSimulacrumTrait = {
  id: "Agleia",
  displayName: "Agleia",
  buffs: [
    {
      id: "Agleia trait - final damage",
      displayName: "Agleia trait - final damage",
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
