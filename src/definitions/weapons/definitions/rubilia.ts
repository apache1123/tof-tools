import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const rubilia = {
  id: "Rubilia",
  simulacrumDisplayName: "Rubilia",
  weaponDisplayName: "Lost Art",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
