import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const mimi = {
  id: "Huang (Mimi)",
  simulacrumDisplayName: "Huang (Mimi)",
  weaponDisplayName: "Azure Dragon",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "Defense",
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
