import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId } from '../../resources';

export const tsubasa = {
  id: 'Tsubasa',
  displayName: 'Tsubasa',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
  damageElement: 'Frost',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  normalAttacks: [
    {
      id: 'tsubasa-auto-chain',
      displayName: 'Tsubasa - auto chain [placeholder]',
      elementalType: { defaultElementalType: 'Frost' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 6,
      },
      endedBy: { duration: 5000 },
      cooldown: 0,
      triggeredBy: { playerInput: true, requirements: {} },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 0,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
