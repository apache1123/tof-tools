import type { WeaponBuffDefinition } from "../../../models/weapon/weapon-buff-definition";
import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

const frostDomainBuffBase = {
  id: "Frost Domain",
  displayName: "Frost Domain",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {}, // TODO:
  maxStacks: 1,
} as const satisfies Partial<WeaponBuffDefinition>;

export const frigg = {
  id: "Frigg",
  simulacrumDisplayName: "Frigg",
  weaponDisplayName: "Balmung",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      ...frostDomainBuffBase,
      description: "Frost Domain gives +15% frost ATK",
      attackPercentBuffs: [{ value: 0.15, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 5 },
    },
    {
      ...frostDomainBuffBase,
      description: "Frost Domain gives +40% frost ATK",
      attackPercentBuffs: [{ value: 0.4, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
