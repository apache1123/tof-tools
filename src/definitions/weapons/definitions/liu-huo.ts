import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const liuHuo = {
  id: "Liu Huo",
  simulacrumDisplayName: "Liu Huo",
  weaponDisplayName: "Pine Comet",
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
