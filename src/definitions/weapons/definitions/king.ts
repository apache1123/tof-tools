import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const king = {
  id: "King",
  simulacrumDisplayName: "King",
  weaponDisplayName: "Scythe of the Crow",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
