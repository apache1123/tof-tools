import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const lan: SimulacrumTrait = {
  id: "Lan",
  displayName: "Lan",
  buffs: [
    {
      id: "lan-trait",
      displayName: "Lan trait",
      description:
        "During Fortitude resonance, final damage is increased by 8%",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Fortitude" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.08 }],
    },
  ],
};
