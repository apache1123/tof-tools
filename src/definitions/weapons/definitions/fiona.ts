import type { Weapon } from "../../types/weapon/weapon";

export const fiona = {
  id: "Fiona",
  displayName: "Fiona",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  calculationElements: ["Altered"],
  damageElement: "Altered",
  type: "Support",
  attackPercentBuffs: [
    {
      id: "Altered Resonance",
      displayName: "Altered Resonance",
      description: "+20% ATK when equipping 2 or more altered weapons",
      value: 0.2,
      elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Altered"],
    },
    {
      id: "Fiona discharge",
      displayName: "Fiona discharge",
      description: "+15% ATK for 30s on discharge",
      value: 0.15,
      elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      weaponResonanceRequirements: ["Attack", "Balance"],
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
