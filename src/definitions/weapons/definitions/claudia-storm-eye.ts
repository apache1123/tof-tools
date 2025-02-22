import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const claudiaStormEye = {
  id: "Claudia Storm Eye",
  simulacrumDisplayName: "Claudia Storm Eye",
  weaponDisplayName: "Scarlet Gale",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",
  type: "DPS",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} as const satisfies WeaponDefinition;
