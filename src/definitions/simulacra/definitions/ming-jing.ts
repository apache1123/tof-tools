import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const mingJing: SimulacrumTrait = {
  id: "Ming Jing",
  displayName: "Ming Jing (Zeke)",
  buffs: [
    {
      id: "mingjing-trait",
      displayName: "Ming Jing trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "mingjing-trait-physical-increase",
      displayName: "Ming Jing trait - physical base attack increase",
      description:
        "The Wanderer's base physical ATK is increased to the highest value out of their physical/flame/frost/volt base ATK.",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      miscBuff: {
        increaseElementalBaseAttackToMatchHighest: "Physical",
      },
    },
    {
      id: "mingjing-trait-normal-attack",
      displayName: "Ming Jing trait - normal attack increase",
      description:
        "When the main slot weapon is Onyx Tortoise, normal attack damage is increased by 50%.",
      maxStacks: 1,
      requirements: { activeWeapon: { is: "Ming Jing" } },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      cooldown: 0,
      finalDamageBuffs: [
        {
          value: 0.5,
          restrictedTo: { weapon: "Ming Jing", attackType: "normal" }, // TODO: does this work?
        },
      ],
    },
  ],
};
