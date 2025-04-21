import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const icarus = {
  id: "Icarus",
  simulacrumDisplayName: "Icarus",
  weaponDisplayName: "Precious One",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
