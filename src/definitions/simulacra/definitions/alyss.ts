import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const alyss: PartialSimulacrumTrait = {
  id: "Alyss",
  displayName: "Alyss",
  buffs: [
    {
      id: "alyss-trait",
      displayName: "Alyss trait",
      description:
        "Increase final damage by 18% for 18 seconds after successfully using a weapon skill.",
      maxStacks: 1,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      duration: 18000,
      cooldown: 0,
    },
  ],
};
