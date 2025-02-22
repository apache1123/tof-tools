import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const nolaBase = {
  id: "Nola",
  simulacrumDisplayName: "Nola",
  weaponDisplayName: "Rumble",
  iconWeaponId: "Nola",
  elementalIcon: "Altered",
  resonanceElements: [],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [
    // TODO: these nola trait buffs can be removed once traits can be selected in gear comparer
    {
      id: "Nola trait - altered attack 1 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 1 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.05,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Nola trait - altered attack 2 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 2 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.1,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Nola trait - altered attack 3 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies WeaponDefinition;
