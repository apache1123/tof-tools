import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const nanto: PartialSimulacrumTrait = {
  id: "Nanto",
  displayName: "Nanto",
  buffs: [
    {
      id: "Nanto trait - final damage",
      displayName: "Nanto trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Nanto trait - Nanto equipped 1 physical buff",
      displayName: "Nanto trait - Nanto equipped 1 physical buff",
      description:
        "Increase Physical Damage by 10% for each Physical Weapon when Frostfang is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nanto"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Physical"] }],
    },
    {
      id: "Nanto trait - Nanto equipped 2 physical buff",
      displayName: "Nanto trait - Nanto equipped 2 physical buff",
      description:
        "Increase Physical Damage by 10% for each Physical Weapon when Frostfang is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nanto"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.2, elementalTypes: ["Physical"] }],
    },
    {
      id: "Nanto trait - Nanto equipped 3 physical buff",
      displayName: "Nanto trait - Nanto equipped 3 physical buff",
      description:
        "Increase Physical Damage by 10% for each Physical Weapon when Frostfang is deployed",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nanto"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
    },
  ],
};
