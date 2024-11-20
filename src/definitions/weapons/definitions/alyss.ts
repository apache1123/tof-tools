import type { Weapon } from "../../types/weapon/weapon";

export const alyss = {
  id: "Alyss",
  displayName: "Alyss",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "DPS",
  attackPercentBuffs: [
    {
      id: "Frost Resonance",
      displayName: "Frost Resonance",
      description: "+15% frost ATK when equipping 2 or more frost weapons",
      value: 0.15,
      elementalTypes: ["Frost"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Frost"],
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
