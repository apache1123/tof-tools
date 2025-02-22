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
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [
    {
      id: "Ultimate Heat",
      displayName: "Ultimate Heat",
      description: "Ultimate Heat gives +10% flame ATK after fully stacked",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
