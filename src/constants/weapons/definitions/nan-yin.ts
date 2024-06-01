import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId } from '../../resources';

export const nanYin = {
  id: 'Nan Yin',
  displayName: 'Nan Yin',
  resonanceElements: ['Altered'],
  calculationElements: ['Altered'],
  damageElement: 'Altered',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'The Final Tune',
      displayName: 'The Final Tune',
      description: '+30% ATK when equipping 3 altered weapons, works off-hand',
      value: 0.3,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalWeaponsRequirements: [
        {
          weaponElementalType: 'Altered',
          minNumOfWeapons: 3,
        },
      ],
    },
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [
    {
      id: 'nanyin-normal-auto-chain',
      displayName: 'Nan Yin - Auto chain',
      elementalType: {
        defaultElementalType: 'Altered',
        followLastWeaponElementalType: true,
      },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 11.98,
        attackFlat: 63,
      },
      hitCount: {
        numberOfHitsFixed: 5,
      },
      endedBy: { duration: 6000 },
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
  buffs: [
    {
      id: 'nanyin-atk-buff-the-final-tune',
      displayName: 'Nan Yin - The final tune',
      description: '',
      attackBuffs: [
        {
          value: 0.3,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        },
      ],
      maxStacks: 1,
      triggeredBy: {
        combatStart: true,
        requirements: {
          elementalTypeWeaponsInTeam: [
            {
              elementalType: 'Altered',
              numOfWeapons: 3,
            },
          ],
        },
      },
      endedBy: {
        combatEnd: true,
      },
      cooldown: 0,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
