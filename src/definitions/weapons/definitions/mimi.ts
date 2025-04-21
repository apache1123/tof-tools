import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const mimi = {
  id: "Huang (Mimi)",
  simulacrumDisplayName: "Huang (Mimi)",
  weaponDisplayName: "Azure Dragon",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
