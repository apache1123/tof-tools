import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const claudia = {
  id: "Claudia",
  simulacrumDisplayName: "Claudia",
  weaponDisplayName: "Guren Blade",
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
