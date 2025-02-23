import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const crow = {
  id: "Crow",
  simulacrumDisplayName: "Crow",
  weaponDisplayName: "Thunderblades",
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
