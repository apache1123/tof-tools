import type { Weapon } from "../../types/weapon/weapon";

export const lingHan = {
  id: "Ling Han",
  displayName: "Ling Han",
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
    {
      id: "Ling Han 1*",
      displayName: "Ling Han 1*",
      description: "+10% frost ATK after launching Frost Blades",
      value: 0.1,
      elementalTypes: ["Frost"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 1,
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
} satisfies Weapon;
