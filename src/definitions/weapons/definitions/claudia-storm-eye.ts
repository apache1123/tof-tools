import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const claudiaStormEye = {
  id: "Claudia Storm Eye",
  simulacrumDisplayName: "Claudia Storm Eye",
  weaponDisplayName: "Scarlet Gale",
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
} as const satisfies PartialWeaponDefinition;
