import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const fenrir = {
  id: "Fenrir",
  simulacrumDisplayName: "Fenrir",
  weaponDisplayName: "Gleipnir",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "DPS",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [
    {
      id: "Fenrir 6*",
      displayName: "Fenrir 6*",
      description: "Active when Fenrir is on-field + 5s off-field",
      cooldown: 0,
      requirements: { activeWeapon: { is: "Fenrir" } },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      maxStacks: 1,
      critRateBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
