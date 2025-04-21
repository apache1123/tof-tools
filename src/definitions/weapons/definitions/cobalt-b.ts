import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

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
} satisfies PartialWeaponDefinition;
