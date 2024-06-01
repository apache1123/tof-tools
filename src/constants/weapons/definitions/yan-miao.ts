import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId } from '../../resources';

export const yanMiao = {
  id: 'Yan Miao',
  displayName: 'Yan Miao',
  resonanceElements: ['Physical', 'Flame'],
  calculationElements: ['Physical', 'Flame'],
  damageElement: 'Physical',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'Physical Resonance',
      displayName: 'Physical Resonance',
      description:
        '+15% physical ATK when equipping 2 or more physical weapons',
      value: 0.15,
      elementalTypes: ['Physical'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Physical'],
    },
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
  normalAttacks: [
    {
      id: 'yanmiao-auto-chain',
      displayName: 'Yan Miao - auto chain [placeholder]',
      elementalType: { defaultElementalType: 'Physical' },
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
