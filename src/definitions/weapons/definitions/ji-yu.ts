import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const jiYu = {
  id: "Ji Yu",
  simulacrumDisplayName: "Ji Yu",
  weaponDisplayName: "Freeflow",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
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
    {
      id: "Physical Resonance",
      displayName: "Physical Resonance",
      description:
        "+15% physical ATK when equipping 2 or more physical weapons",
      value: 0.15,
      elementalTypes: ["Physical"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Physical"],
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
