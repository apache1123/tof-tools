import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const lyra = {
  id: "Lyra",
  simulacrumDisplayName: "Lyra",
  weaponDisplayName: "Vesper",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
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
