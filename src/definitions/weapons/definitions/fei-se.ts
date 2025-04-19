import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const feiSe = {
  id: "Fei Se",
  simulacrumDisplayName: "Fei Se",
  weaponDisplayName: "Endless Bloom",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
