import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const asurada = {
  id: "Asurada",
  simulacrumDisplayName: "Asurada",
  weaponDisplayName: "Hellfire",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} as const satisfies PartialWeaponDefinition;
