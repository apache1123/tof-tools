import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const antoria: SimulacrumTrait = {
  id: "Antoria",
  displayName: "Antoria",
  buffs: [
    {
      id: "Antoria trait - final damage",
      displayName: "Antoria trait - final damage",
      description: "Increases final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Antoria trait - volt damage 1 volt weapon",
      displayName: "Antoria trait - volt damage 1 volt weapon",
      description:
        "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Antoria"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.05, elementalTypes: ["Volt"] }],
    },
    {
      id: "Antoria trait - volt damage 2 volt weapons",
      displayName: "Antoria trait - volt damage 2 volt weapons",
      description:
        "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Antoria"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Volt"] }],
    },
    {
      id: "Antoria trait - volt damage 3 volt weapons",
      displayName: "Antoria trait - volt damage 3 volt weapons",
      description:
        "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Antoria"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.15, elementalTypes: ["Volt"] }],
    },
  ],
};
