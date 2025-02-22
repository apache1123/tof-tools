import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

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
} satisfies WeaponDefinition;
