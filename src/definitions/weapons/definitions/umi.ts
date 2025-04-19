import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const umi = {
  id: "Umi",
  simulacrumDisplayName: "Umi",
  weaponDisplayName: "Mobius",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
