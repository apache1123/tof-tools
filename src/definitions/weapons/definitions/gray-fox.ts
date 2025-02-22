import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const grayFox = {
  id: "Gray Fox",
  simulacrumDisplayName: "Gray Fox",
  weaponDisplayName: "The Witch's Key",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",
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
} as const satisfies WeaponDefinition;
