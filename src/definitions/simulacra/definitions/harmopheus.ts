import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const harmopheus: PartialSimulacrumTrait = {
  id: "Harmopheus",
  displayName: "Harmopheus",
  buffs: [
    {
      id: "Harmopheus trait - final damage",
      displayName: "Harmopheus trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Harmopheus trait - volt damage 1 volt weapon",
      displayName: "Harmopheus trait - volt damage 1 volt weapon",
      description:
        "Grants a 14% Volt Damage Boost for each Volt weapon equipped when Neverrest is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Harmopheus"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.14, elementalTypes: ["Volt"] }],
    },
    {
      id: "Harmopheus trait - volt damage 2 volt weapons",
      displayName: "Harmopheus trait - volt damage 2 volt weapons",
      description:
        "Grants a 14% Volt Damage Boost for each Volt weapon equipped when Neverrest is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Harmopheus"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.28, elementalTypes: ["Volt"] }],
    },
    {
      id: "Harmopheus trait - volt damage 3 volt weapons",
      displayName: "Harmopheus trait - volt damage 3 volt weapons",
      description:
        "Grants a 14% Volt Damage Boost for each Volt weapon equipped when Neverrest is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Harmopheus"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.42, elementalTypes: ["Volt"] }],
    },
  ],
};
