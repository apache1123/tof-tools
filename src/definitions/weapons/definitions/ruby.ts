import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const ruby = {
  id: "Ruby",
  simulacrumDisplayName: "Ruby",
  weaponDisplayName: "Spark",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "DPS",
  attackPercentBuffs: [
    {
      id: "Flame Resonance",
      displayName: "Flame Resonance",
      description: "+15% flame ATK when equipping 2 or more flame weapons",
      value: 0.15,
      elementalTypes: ["Flame"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Flame"],
    },
    {
      id: "Ultimate Heat",
      displayName: "Ultimate Heat",
      description: "Ultimate Heat gives +10% flame ATK after fully stacked",
      value: 0.1,
      elementalTypes: ["Flame"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
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
