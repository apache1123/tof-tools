import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const yanMiao = {
  id: "Yan Miao",
  simulacrumDisplayName: "Yan Miao",
  weaponDisplayName: "Equilibrium",
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
} satisfies WeaponDefinition;
