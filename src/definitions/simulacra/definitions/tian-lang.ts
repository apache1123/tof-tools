import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const tianLang: SimulacrumTrait = {
  id: "Tian Lang",
  displayName: "Tian Lang",
  buffs: [
    {
      id: "tianlang-trait",
      displayName: "Tian Lang trait",
      description:
        "When volt weapon skill and discharge skill are released simultaneously, increase volt damage by 18% for 8 seconds.",
      cooldown: 0,
      duration: 8000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {
        // TODO:
        // endOfSkillOfElementalType: 'Volt',
        // endOfDischargeOfElementalType: 'Volt',
      },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.18, elementalTypes: ["Volt"] }],
      remarks:
        'Assuming the effect activates every volt weapon skill or discharge, ignoring the "simultaneously" requirement',
    },
  ],
};
