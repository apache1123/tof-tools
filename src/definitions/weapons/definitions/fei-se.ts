import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const feiSe = {
  id: "Fei Se",
  simulacrumDisplayName: "Fei Se",
  weaponDisplayName: "Endless Bloom",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "DPS",
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
} satisfies WeaponDefinition;
