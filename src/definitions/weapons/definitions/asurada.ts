import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const asurada = {
  id: "Asurada",
  simulacrumDisplayName: "Asurada",
  weaponDisplayName: "Hellfire",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",
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
