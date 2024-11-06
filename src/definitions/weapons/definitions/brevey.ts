import type { Weapon } from "../../types/weapon/weapon";

export const brevey = {
  id: "Brevey",
  displayName: "Brevey",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  calculationElements: ["Volt", "Frost"],
  damageElement: "Volt",
  type: "Support",
  attackPercentBuffs: [
    {
      id: "Volt Resonance",
      displayName: "Volt Resonance",
      description: "+15% volt ATK when equipping 2 or more volt weapons",
      value: 0.15,
      elementalTypes: ["Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Volt"],
    },
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
  resources: [
    {
      id: "swift-cut",
      displayName: "Swift cut",
      maxAmount: 30,
      regenerate: {
        amountPerSecond: 2,
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "damage-accumulated-factor-of-total-attack",
      displayName: "Damage accumulated (as factor of attack)",
      maxAmount: 300,
      regenerate: {
        amountFromAccumulatedDamageAsFactorOfTotalAttack: true,
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      remarks:
        "Used to track the amount of damage accumulated, one unit is 1 times the total ATK",
    },
  ],
} satisfies Weapon;
