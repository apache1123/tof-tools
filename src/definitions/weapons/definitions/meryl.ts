import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const meryl = {
  id: "Meryl",
  simulacrumDisplayName: "Meryl",
  weaponDisplayName: "Rosy Edge",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
