import type { Weapon } from "../../types/weapon/weapon";

export const lan = {
  id: "Lan",
  displayName: "Lan",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  calculationElements: ["Flame"],
  damageElement: "Flame",
  type: "Defense",
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
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies Weapon;
