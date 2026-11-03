import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const wrenna: PartialSimulacrumTrait = {
  id: "Wrenna",
  displayName: "Wrenna",
  buffs: [
    {
      id: "Wrenna trait",
      displayName: "Wrenna trait",
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
