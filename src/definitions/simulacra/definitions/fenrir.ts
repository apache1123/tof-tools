import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const fenrir: PartialSimulacrumTrait = {
  id: "Fenrir",
  displayName: "Fenrir",
  buffs: [
    {
      id: "fenrir-trait-2-elemental-types",
      displayName: "Fenrir trait",
      description:
        "Increase final damage by 18% when equipping 2 weapons of different elements",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: { numOfDifferentElementalTypes: 2 },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "fenrir-trait-3-elemental-types",
      displayName: "Fenrir trait",
      description:
        "Increase final damage by 23% when equipping 3 weapons of different elements",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: { numOfDifferentElementalTypes: 3 },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.23 }],
    },
  ],
};
