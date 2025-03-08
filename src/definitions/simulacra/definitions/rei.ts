import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const rei: SimulacrumTrait = {
  id: "Rei",
  displayName: "Rei",
  buffs: [
    {
      id: "rei-trait",
      displayName: "Rei trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "rei-trait-attack-resonance",
      displayName: "Rei trait - Attack resonance",
      description:
        "Increase volt damage by 8% when Attack Resonance is activated",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Attack" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.08, elementalTypes: ["Volt"] }],
    },
  ],
};
