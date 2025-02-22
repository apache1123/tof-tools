import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const roslyn = {
  id: "Roslyn",
  simulacrumDisplayName: "Roslyn",
  weaponDisplayName: "Calm Waves",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",
  type: "DPS",
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [
    // TODO: this is temporary until trait selection is added to gear comparer
    {
      id: "Roslyn trait - crit damage",
      displayName:
        "Roslyn trait (assumes you will also equip her trait when using her weapon)",
      description:
        "After using Bitter Strike, increase crit damage for 40 seconds",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      critDamageBuffs: [{ value: 0.24 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies WeaponDefinition;
