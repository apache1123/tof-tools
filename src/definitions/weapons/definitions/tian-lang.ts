import type { PartialWeaponBuffAbilityDefinition } from "../../types/weapon/partial-weapon-buff-ability-definition";
import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

const voltSenseBuffBase = {
  displayName: "Volt sense",
  description: "+6% volt ATK for each other volt weapons equipped",
  cooldown: 0,
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
} as const satisfies Partial<PartialWeaponBuffAbilityDefinition>;

export const tianLang = {
  id: "Tian Lang",
  simulacrumDisplayName: "Tian Lang",
  weaponDisplayName: "Thunderbreaker",
  elementalIcon: "Volt",
  resonanceElements: ["Volt"],
  gearResonanceElements: ["Volt"],
  damageElement: "Volt",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      ...voltSenseBuffBase,
      id: "Volt sense - 1 other volt weapon",
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
          },
        },
      },
      attackPercentBuffs: [{ value: 0.06, elementalTypes: ["Volt"] }],
    },
    {
      ...voltSenseBuffBase,
      id: "Volt sense - 2 other volt weapons",
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
          },
        },
      },
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Volt"] }],
    },
  ],
  resources: [],
} satisfies PartialWeaponDefinition;
