import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const gnonno: SimulacrumTrait = {
  id: "Gnonno",
  displayName: "Gnonno",
  buffs: [
    {
      id: "Gnonno trait",
      displayName: "Gnonno trait",
      description:
        "After Exploration Team Strike triggers Total Berserk, increase final damage by 23% for 30 seconds",
      cooldown: 0,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.23 }],
    },
  ],
};
