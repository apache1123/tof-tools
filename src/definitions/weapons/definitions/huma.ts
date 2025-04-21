import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const huma = {
  id: "Huma",
  simulacrumDisplayName: "Huma",
  weaponDisplayName: "Molten Shield V2",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
