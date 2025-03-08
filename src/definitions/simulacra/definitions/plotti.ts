import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const plotti: SimulacrumTrait = {
  id: "Plotti",
  displayName: "Plotti",
  buffs: [
    {
      id: "plotti-trait",
      displayName: "Plotti trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "plotti-trait-weapon-damage-buff",
      displayName: "Plotti trait - plotti weapon buff",
      description:
        "Increase EP-7000 Skyfire EP-7000 Skyfire's flame damage by 30%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Plotti"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.3,
          elementalTypes: ["Flame"],
          restrictedTo: { weapon: "Plotti" },
        },
      ],
    },
  ],
};
