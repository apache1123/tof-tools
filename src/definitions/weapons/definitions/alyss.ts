import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const alyss = {
  id: "Alyss",
  simulacrumDisplayName: "Alyss",
  weaponDisplayName: "Unyielding Wing",
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
