import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const carrot: SimulacrumTrait = {
  id: "Carrot",
  displayName: "Carrot",
  buffs: [
    {
      id: "Carrot trait - final damage",
      displayName: "Carrot trait - final damage",
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
