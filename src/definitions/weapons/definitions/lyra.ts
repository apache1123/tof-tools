import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const lyra = {
  id: "Lyra",
  simulacrumDisplayName: "Lyra",
  weaponDisplayName: "Vesper",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
  type: "Support",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies PartialWeaponDefinition;
