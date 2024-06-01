import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId } from '../../resources';

export const mimi = {
  id: 'Huang (Mimi)',
  displayName: 'Huang (Mimi)',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'Defense',
  attackPercentBuffs: [
    {
      id: 'Volt Resonance',
      displayName: 'Volt Resonance',
      description: '+15% volt ATK when equipping 2 or more volt weapons',
      value: 0.15,
      elementalTypes: ['Volt'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Volt'],
    },
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [
    {
      id: 'mimi-normal-auto-chain',
      displayName: 'Mimi - Auto chain',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 11.257,
        attackFlat: 59,
      },
      hitCount: {
        numberOfHitsFixed: 5,
      },
      endedBy: { duration: 3370 },
      cooldown: 0,
      triggeredBy: { playerInput: true, requirements: {} },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          // TODO:
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
