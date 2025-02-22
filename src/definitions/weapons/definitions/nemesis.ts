import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const nemesis = {
  id: "Nemesis",
  simulacrumDisplayName: "Nemesis",
  weaponDisplayName: "Venus",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "Support",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [
    {
      id: "Nemesis 5*",
      displayName: "Nemesis 5*",
      description: "+10% ATK for having 1 electrode out",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.1,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 5 },
    },
    {
      id: "Nemesis 6*",
      displayName: "Nemesis 6*",
      description: "+15% ATK for having 2 electrode out",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
