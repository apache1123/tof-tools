import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const fiona = {
  id: "Fiona",
  simulacrumDisplayName: "Fiona",
  weaponDisplayName: "Moonstar Bracelet",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "Support",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Fiona discharge",
      displayName: "Fiona discharge",
      description: "+15% ATK for 30s on discharge",
      cooldown: 0,
      duration: 30000,
      requirements: { teamRequirements: { anyWeapon: ["Fiona"] } },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
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
} satisfies WeaponDefinition;
