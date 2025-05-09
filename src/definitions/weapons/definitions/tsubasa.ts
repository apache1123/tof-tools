import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const tsubasa = {
  id: "Tsubasa",
  simulacrumDisplayName: "Tsubasa",
  weaponDisplayName: "Icewind Arrow",
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
