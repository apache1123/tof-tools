import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const rubilia = {
  id: "Rubilia",
  simulacrumDisplayName: "Rubilia",
  weaponDisplayName: "Lost Art",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
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
