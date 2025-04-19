import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const liuHuo: PartialSimulacrumTrait = {
  id: "Liu Huo",
  displayName: "Liu Huo",
  buffs: [
    {
      id: "liuhuo-trait",
      displayName: "Liu Huo trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    // TODO: liu huo trait additional effects...
  ],
};
