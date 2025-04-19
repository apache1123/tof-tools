import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const brevey = {
  id: "Brevey",
  simulacrumDisplayName: "Brevey",
  weaponDisplayName: "Pactcrest ☆ Metz",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",
  type: "Support",

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
} satisfies PartialWeaponDefinition;
