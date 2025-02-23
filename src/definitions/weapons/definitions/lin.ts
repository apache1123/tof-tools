import type { WeaponBuffDefinition } from "../../../models/weapon/weapon-buff-definition";
import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

const moonlightRealmBuffBase = {
  id: "Moonlight Realm",
  displayName: "Moonlight Realm",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: {}, // TODO:
  maxStacks: 1,
} as const satisfies Partial<WeaponBuffDefinition>;

export const lin = {
  id: "Lin",
  simulacrumDisplayName: "Lin",
  weaponDisplayName: "Shadoweave",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      ...moonlightRealmBuffBase,
      description: "Moonlight Realm gives +15% ATK for its duration",
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 5 },
    },
    {
      ...moonlightRealmBuffBase,
      description: "Moonlight Realm gives +23% ATK for its duration",
      attackPercentBuffs: [
        {
          value: 0.23,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
    {
      id: "Frost Moonlight Realm",
      displayName: "Frost Moonlight Realm",
      description: "Frost Moonlight Realm gives +10% frost ATK",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [
              { element: "Frost", numOfWeapons: 2 },
              { element: "Frost", numOfWeapons: 3 },
            ],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Balance Moonlight Realm",
      displayName: "Balance Moonlight Realm",
      description:
        "When paired with any 2 different elemental weapons, Moonlight Realm gives +15% ATK",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          elementalWeapons: { numOfDifferentElementalTypes: 3 },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
