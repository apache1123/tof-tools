import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const asuka = {
  id: "Asuka",
  simulacrumDisplayName: "Asuka",
  weaponDisplayName: "Spear of Longinus",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
