import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const gnonno = {
  id: "Gnonno",
  simulacrumDisplayName: "Gnonno",
  weaponDisplayName: "Mini Hurricane",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
