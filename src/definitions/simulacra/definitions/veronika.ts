import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const veronika: PartialSimulacrumTrait = {
  id: "Veronika",
  displayName: "Veronika",
  buffs: [
    {
      id: "Veronika trait - final damage",
      displayName: "Veronika trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Veronika trait - Veronika equipped volt buff",
      displayName: "Veronika trait - Veronika equipped volt buff",
      description: "Increases Volt Damage by 30% when equipped with Visios",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Veronika"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Volt"] }],
    },
  ],
};
