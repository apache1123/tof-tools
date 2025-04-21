import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const zero = {
  id: "Zero",
  simulacrumDisplayName: "Zero",
  weaponDisplayName: "Negating Cube",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "Support",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
