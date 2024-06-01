import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId } from '../../resources';

export const feiSe = {
  id: 'Fei Se',
  displayName: 'Fei Se',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'Flame Resonance',
      displayName: 'Flame Resonance',
      description: '+15% flame ATK when equipping 2 or more flame weapons',
      value: 0.15,
      elementalTypes: ['Flame'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Flame'],
    },
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [
    {
      id: 'feise-skill-whirling',
      displayName: 'Fei Se - Whirling [placeholder]',
      elementalType: { defaultElementalType: 'Flame' },
      type: 'skill',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 5000 },
      cooldown: 20000,
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
  discharges: [],
  buffs: [],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
