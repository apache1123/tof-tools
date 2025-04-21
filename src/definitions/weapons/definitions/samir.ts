import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const samir = {
  id: "Samir",
  simulacrumDisplayName: "Samir",
  weaponDisplayName: "Dual EM Stars",
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
} satisfies PartialWeaponDefinition;
