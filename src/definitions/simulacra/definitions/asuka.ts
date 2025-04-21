import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const asuka: PartialSimulacrumTrait = {
  id: "Asuka",
  displayName: "Asuka",
  buffs: [
    {
      id: "asuka-trait",
      displayName: "Asuka trait",
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
