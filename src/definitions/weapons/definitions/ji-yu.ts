import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const jiYu = {
  id: "Ji Yu",
  simulacrumDisplayName: "Ji Yu",
  weaponDisplayName: "Freeflow",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
