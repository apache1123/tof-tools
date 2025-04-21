import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const cocoritter = {
  id: "Cocoritter",
  simulacrumDisplayName: "Cocoritter",
  weaponDisplayName: "Absolute Zero",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "Support",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
