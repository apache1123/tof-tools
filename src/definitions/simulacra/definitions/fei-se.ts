import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const feiSe: PartialSimulacrumTrait = {
  id: "Fei Se",
  displayName: "Fei Se",
  buffs: [
    {
      id: "feise-trait-1-flame",
      displayName: "Fei Se trait",
      description:
        "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
      cooldown: 0,
      duration: 30000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {
        // endOfAttacks: ['feise-skill-whirling'],
      },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.09 }],
    },
    {
      id: "feise-trait-2-flame",
      displayName: "Fei Se trait",
      description:
        "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
      cooldown: 0,
      duration: 30000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {
        // abilityEnd: ["feise-skill-whirling"],
      },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "feise-trait-3-flame",
      displayName: "Fei Se trait",
      description:
        "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
      cooldown: 0,
      duration: 30000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {
        // abilityEnd: ["feise-skill-whirling"],
      },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.27 }],
    },
  ],
};
