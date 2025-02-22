import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const cobaltB = {
  id: "Cobalt-B",
  simulacrumDisplayName: "Cobalt-B",
  weaponDisplayName: "Flaming Revolver",
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
} satisfies WeaponDefinition;
