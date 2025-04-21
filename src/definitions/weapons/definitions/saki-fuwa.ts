import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const sakiFuwa = {
  id: "Saki Fuwa",
  simulacrumDisplayName: "Saki Fuwa",
  weaponDisplayName: "Heartstream",
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
