import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const nanYin = {
  id: "Nan Yin",
  simulacrumDisplayName: "Nan Yin",
  weaponDisplayName: "Purple Bamboo",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "The Final Tune",
      displayName: "The Final Tune",
      description: "+30% ATK when equipping 3 altered weapons, works off-hand",
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
          value: 0.3,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies PartialWeaponDefinition;
