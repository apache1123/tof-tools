import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const anka = {
  id: "Anka",
  simulacrumDisplayName: "Anka",
  weaponDisplayName: "Poppin' Stick",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} as const satisfies WeaponDefinition;
