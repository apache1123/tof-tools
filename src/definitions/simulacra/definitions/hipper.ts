import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const hipper: PartialSimulacrumTrait = {
  id: "Hipper",
  displayName: "Hipper",
  buffs: [
    {
      id: "Hipper trait - final damage",
      displayName: "Hipper trait - final damage",
      description: "Increases final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Hipper trait - Hipper equipped buffs",
      displayName: "Hipper trait - Hipper equipped buffs",
      description:
        "Increases volt damage by 11% and final damage by 11% when AF-010 Servion is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Hipper"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Volt"] }],
      finalDamageBuffs: [{ value: 0.11 }],
    },
  ],
};
