import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const rei = {
  id: "Rei",
  displayName: "Rei",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",
  type: "DPS",
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
    {
      id: "Energy Consumption - Volt",
      displayName: "Energy Consumption",
      description: "+15% volt ATK when Energy Consumption is active",
      value: 0.15,
      elementalTypes: ["Volt"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
    },
    {
      id: "Energy Consumption - Frost",
      displayName: "Energy Consumption",
      description: "+5% volt ATK when Energy Consumption is active",
      value: 0.05,
      elementalTypes: ["Frost"],
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
  resources: [
    {
      id: "rei-special-energy",
      displayName: "Rei - Special energy",
      maxAmount: 100,
      startingAmount: 100,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "rei-homing-arrows-on-enemy",
      displayName: "Rei - Number of homing arrows on enemy",
      maxAmount: 3,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
} satisfies WeaponDefinition;
