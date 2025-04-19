import type { PartialWeaponBuffAbilityDefinition } from "../../types/weapon/partial-weapon-buff-ability-definition";
import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

const tranquilHeartBuffBase = {
  id: "Tranquil Heart",
  displayName: "Tranquil Heart",
  cooldown: 0,
  duration: 15000,
  requirements: { teamRequirements: { anyWeapon: ["Annabella"] } },
  canBePlayerTriggered: false,
  triggeredBy: { hitOfWeapon: "Annabella" },
  maxStacks: 3,
} as const satisfies Partial<PartialWeaponBuffAbilityDefinition>;

export const annabella = {
  id: "Annabella",
  simulacrumDisplayName: "Annabella",
  weaponDisplayName: "Clover Cross",
  elementalIcon: "Flame",
  resonanceElements: ["Flame"],
  gearResonanceElements: ["Flame"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      ...tranquilHeartBuffBase,
      description:
        "Tranquil Heart: When Clover Cross uses discharge/skill/charged attack/dodge, increase crit rate by 5%, stacking up to 3 times. Lasts for 15s.",
      critRateBuffs: [{ value: 0.05 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 2 },
    },
    {
      ...tranquilHeartBuffBase,
      description:
        "Tranquil Heart: When Clover Cross uses discharge/skill/charged attack/dodge, increase crit rate by 9%, stacking up to 3 times. Lasts for 15s.",
      critRateBuffs: [{ value: 0.09 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies PartialWeaponDefinition;
