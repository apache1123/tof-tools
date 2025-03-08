import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const yanMiao: SimulacrumTrait = {
  id: "Yan Miao",
  displayName: "Yan Miao",
  buffs: [
    {
      id: "yanmiao-trait",
      displayName: "Yan Miao trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "yanmiao-trait-weapon-buff",
      displayName: "Yan Miao trait - Equilibrium buff",
      description:
        "When Equilibrium is equipped, increase physical damage dealt to targets with less than 80% of HP by 10%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Yan Miao"] } },
      canBePlayerTriggered: false,
      // TODO:
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Physical"] }],
      remarks: "This is assumed to be active 80% of the battle duration",
    },
    {
      id: "yanmiao-trait-normal-atk-buff-1-phys",
      displayName: "Yan Miao trait - 1 physical weapon",
      description:
        "For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [
        {
          value: 0.2,
          restrictedTo: { weapon: "Yan Miao", attackType: "normal" },
        },
      ],
    },
    {
      id: "yanmiao-trait-normal-atk-buff-2-or-3-phys",
      displayName: "Yan Miao trait - 2 or 3 physical weapons",
      description:
        "For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [
              { element: "Physical", numOfWeapons: 2 },
              { element: "Physical", numOfWeapons: 3 },
            ],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      maxStacks: 1,
      finalDamageBuffs: [
        {
          value: 0.4,
          restrictedTo: { weapon: "Yan Miao", attackType: "normal" },
        },
      ],
    },
  ],
};
