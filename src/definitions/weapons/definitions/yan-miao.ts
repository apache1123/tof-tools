import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const yanMiao = {
  id: "Yan Miao",
  simulacrumDisplayName: "Yan Miao",
  weaponDisplayName: "Equilibrium",
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
} satisfies PartialWeaponDefinition;
