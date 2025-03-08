import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const cocoritter: SimulacrumTrait = {
  id: "Cocoritter",
  displayName: "Cocoritter",
  buffs: [
    {
      id: "cocoritter-trait",
      displayName: "Cocoritter trait",
      description:
        "Using a support-type weapon's discharge skill or weapon skill, increase nearby allies' (including self) ATK by 15% for 5 seconds.",
      cooldown: 0,
      duration: 5000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {
        // endOfSkillOfWeaponType: 'Support',
        // endOfDischargeOfWeaponType: 'Support',
      },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.15,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
  ],
};
