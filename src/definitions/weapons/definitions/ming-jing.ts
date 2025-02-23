import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const mingJing = {
  id: "Ming Jing",
  simulacrumDisplayName: "Ming Jing (Zeke)",
  weaponDisplayName: "Onyx Tortoise",
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
} satisfies WeaponDefinition;
