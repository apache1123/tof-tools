import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const plotti = {
  id: "Plotti",
  simulacrumDisplayName: "Plotti",
  weaponDisplayName: "EP-7000 Skyfire",
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
} satisfies PartialWeaponDefinition;
