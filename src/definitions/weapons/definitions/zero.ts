import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const zero = {
  id: "Zero",
  simulacrumDisplayName: "Zero",
  weaponDisplayName: "Negating Cube",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "Support",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
