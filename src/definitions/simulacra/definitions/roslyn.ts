import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const roslyn: PartialSimulacrumTrait = {
  id: "Roslyn",
  displayName: "Roslyn",
  buffs: [
    {
      id: "Roslyn trait",
      displayName: "Roslyn trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Roslyn trait - crit damage",
      displayName: "Roslyn trait - crit damage",
      description:
        "After using Bitter Strike, increase crit damage by 24% for 40 seconds",
      cooldown: 0,
      duration: 40000,
      requirements: { teamRequirements: { anyWeapon: ["Roslyn"] } },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      critDamageBuffs: [{ value: 0.24 }],
    },
  ],
};
