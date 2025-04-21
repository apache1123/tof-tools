import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const nemesisVoidpiercer: PartialSimulacrumTrait = {
  id: "Nemesis Voidpiercer",
  displayName: "Nemesis Voidpiercer",
  buffs: [
    {
      id: "Nemesis Voidpiercer trait",
      displayName: "Nemesis Voidpiercer trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },

    {
      id: "Nemesis Voidpiercer trait - altered",
      displayName: "Nemesis Voidpiercer trait - altered",
      description:
        "Gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
      cooldown: 0,
      requirements: {
        teamRequirements: { anyWeapon: ["Nemesis Voidpiercer (Altered)"] },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Altered"] }],
    },
    {
      id: "Nemesis Voidpiercer trait - flame",
      displayName: "Nemesis Voidpiercer trait - flame",
      description:
        "Gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nemesis Voidpiercer (Flame-Physical)"],
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Flame"] }],
    },
    {
      id: "Nemesis Voidpiercer trait - frost",
      displayName: "Nemesis Voidpiercer trait - frost",
      description:
        "Gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
      cooldown: 0,
      requirements: {
        teamRequirements: { anyWeapon: ["Nemesis Voidpiercer (Frost-Volt)"] },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Frost"] }],
    },
    {
      id: "Nemesis Voidpiercer trait - physical",
      displayName: "Nemesis Voidpiercer trait - physical",
      description:
        "Gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nemesis Voidpiercer (Physical-Flame)"],
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Physical"] }],
    },
    {
      id: "Nemesis Voidpiercer trait - volt",
      displayName: "Nemesis Voidpiercer trait - volt",
      description:
        "Gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nemesis Voidpiercer (Volt-Frost)"],
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Volt"] }],
    },

    {
      id: "Nemesis Voidpiercer trait - all altered",
      displayName: "Nemesis Voidpiercer trait - all altered",
      description:
        "When using Star of Oblivion, if other equipped weapons are also altered weapons, increase crit damage by 16%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nemesis Voidpiercer (Altered)"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      critDamageBuffs: [{ value: 0.16 }],
    },
  ],
};
