import type { Weapon } from "../../types/weapon/weapon";

export const roslyn = {
  id: "Roslyn",
  displayName: "Roslyn",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  calculationElements: ["Frost", "Volt"],
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
  ],
  critRateBuffs: [],
  critDamageBuffs: [
    // TODO: this is temporary until trait selection is added to gear comparer
    {
      id: "Roslyn trait - crit damage",
      displayName:
        "Roslyn trait (assumes you will also equip her trait when using her weapon)",
      description:
        "After using Bitter Strike, increase crit damage for 40 seconds",
      value: 0.24,
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
    },
  ],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} as const satisfies Weapon;
