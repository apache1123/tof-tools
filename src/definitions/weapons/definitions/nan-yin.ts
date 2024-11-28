import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const nanYin = {
  id: "Nan Yin",
  simulacrumDisplayName: "Nan Yin",
  weaponDisplayName: "Purple Bamboo",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",
  attackPercentBuffs: [
    {
      id: "The Final Tune",
      displayName: "The Final Tune",
      description: "+30% ATK when equipping 3 altered weapons, works off-hand",
      value: 0.3,
      elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
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
} satisfies WeaponDefinition;
