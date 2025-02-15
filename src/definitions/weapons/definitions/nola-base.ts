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
  attackPercentBuffs: [
    // TODO: these nola trait buffs can be removed once traits can be selected in gear comparer
    {
      id: "Nola trait - altered attack 1 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      value: 0.05,
      elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalWeaponsRequirements: [
        {
          weaponElementalType: "Altered",
          minNumOfWeapons: 1,
          maxNumOfWeapons: 1,
        },
      ],
    },
    {
      id: "Nola trait - altered attack 2 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      value: 0.1,
      elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalWeaponsRequirements: [
        {
          weaponElementalType: "Altered",
          minNumOfWeapons: 2,
          maxNumOfWeapons: 2,
        },
      ],
    },
    {
      id: "Nola trait - altered attack 3 altered weapon",
      displayName:
        "Nola trait - attack buff (assumes you may also equip her trait when using Nola with altered weapons)",
      description: "For every altered weapon equipped, increase ATK by 5%",
      value: 0.15,
      elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalWeaponsRequirements: [
        {
          weaponElementalType: "Altered",
          minNumOfWeapons: 3,
          maxNumOfWeapons: 3,
        },
      ],
    },
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} as const satisfies WeaponDefinition;
