import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const nanYin: PartialSimulacrumTrait = {
  id: "Nan Yin",
  displayName: "Nan Yin",
  buffs: [
    {
      id: "nanyin-trait",
      displayName: "Nan Yin trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "nanyin-trait-active-weapon-1-non-altered",
      displayName: "Nan Yin trait - 1 non-altered weapon",
      description:
        "When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%",
      cooldown: 0,
      requirements: {
        activeWeapon: { is: "Nan Yin" },
        teamRequirements: {
          elementalWeapons: {
            numOfNotElementalWeapons: {
              notElement: "Altered",
              numOfWeapons: 1,
            },
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.08,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
    {
      id: "nanyin-trait-active-weapon-2-non-altered",
      displayName: "Nan Yin trait - 2 non-altered weapons",
      description:
        "When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%",
      cooldown: 0,
      requirements: {
        activeWeapon: { is: "Nan Yin" },
        teamRequirements: {
          elementalWeapons: {
            numOfNotElementalWeapons: {
              notElement: "Altered",
              numOfWeapons: 2,
            },
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.16,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
  ],
};
