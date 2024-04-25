import { weaponDefinitions } from '../../../../constants/weapon-definitions';
import type { ElementalAttack } from '../../../elemental-attack';
import type { Loadout } from '../../../loadout';
import type { LoadoutStats } from '../../../loadout-stats';
import { Team } from '../../../team';
import { Weapon } from '../../../weapon';
import type { AttackAction } from '../../attack/attack-action';
import type { BuffAction } from '../../buff/buff-action';
import { DamageCalculator } from '../damage-calculator';

describe('DamageCalculator', () => {
  let weapon1: Weapon;
  let weapon2: Weapon;
  let weapon3: Weapon;
  let team: Team;
  let loadout: jest.Mocked<Loadout>;

  beforeEach(() => {
    // NOTE: Both Brevey & Yanuo has volt/frost fusion. Using highest volt or frost values
    weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    weapon2 = new Weapon(weaponDefinitions.byId['Yanuo']);
    weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

    team = new Team();
    team.weapon1 = weapon1;
    team.weapon2 = weapon2;
    team.weapon3 = weapon3;

    loadout = {
      loadoutStats: {
        getElementalAttack(element) {
          return element === 'Frost'
            ? ({ baseAttack: 20000 } as ElementalAttack)
            : ({ baseAttack: 30000 } as ElementalAttack);
        },
      } as LoadoutStats,
      getGearAttackPercent(element) {
        return element === 'Frost' ? 0.1 : 0.5;
      },
      getGearElementalDamage(element) {
        return element === 'Frost' ? 0.1 : 0.5;
      },
    } as jest.Mocked<Loadout>;
  });

  describe('Base attack', () => {
    it('uses the highest base attack for a dual-element weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getBaseAttack()).toBe(30000);
    });

    it('uses the highest base attack for an altered weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon3,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getBaseAttack()).toBe(30000);
    });
  });

  describe('Gear attack buff value', () => {
    it('uses the highest gear atk% for a dual-element weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getGearAttackPercent()).toBe(0.5);
    });

    it('uses the highest gear atk% for an altered weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon3,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getGearAttackPercent()).toBe(0.5);
    });
  });

  describe('Gear damage buff value', () => {
    it('uses the highest gear dmg% for a dual-element weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getGearDamagePercent()).toBe(0.5);
    });

    it('uses the highest gear dmg% for an altered weapon', () => {
      const sut = new DamageCalculator(
        {} as AttackAction,
        weapon3,
        loadout,
        loadout.loadoutStats,
        []
      );

      expect(sut.getGearDamagePercent()).toBe(0.5);
    });
  });

  describe('Total attack buff value', () => {
    it('calculates total atk% value correctly', () => {
      const sut = new DamageCalculator(
        { elementalType: 'Frost' } as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        [
          {
            attackBuffs: [
              { elementalTypes: ['Frost'], value: 0.2 },
              { elementalTypes: ['Frost'], value: 0.35 },
            ],
            stacks: 2,
          },
          {
            attackBuffs: [{ elementalTypes: ['Frost'], value: 0.3 }],
            stacks: 1,
          },
        ] as BuffAction[]
      );

      expect(sut.getTotalAttackPercent()).toBe(1.9);
    });

    it("calculates total atk% value correctly, ignoring atk buffs that are not of the attack's element type", () => {
      const sut = new DamageCalculator(
        { elementalType: 'Frost' } as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        [
          {
            attackBuffs: [{ elementalTypes: ['Frost'], value: 0.2 }],
            stacks: 2,
          },
          {
            attackBuffs: [{ elementalTypes: ['Volt'], value: 0.3 }],
            stacks: 1,
          },
        ] as BuffAction[]
      );

      expect(sut.getTotalAttackPercent()).toBe(0.9);
    });
  });

  describe('Total damage buff value', () => {
    it('calculates total dmg% value correctly, taking into account different damage categories', () => {
      const sut = new DamageCalculator(
        { elementalType: 'Frost' } as AttackAction,
        weapon2,
        loadout,
        loadout.loadoutStats,
        [
          {
            damageBuffs: [
              {
                elementalTypes: ['Frost'],
                value: 0.2,
                damageCategory: 'DMG buff category 1',
              },
              {
                elementalTypes: ['Frost'],
                value: 0.35,
                damageCategory: 'DMG buff category 1',
              },
            ],
            stacks: 2,
          },
          {
            damageBuffs: [
              {
                elementalTypes: ['Frost'],
                value: 0.3,
                damageCategory: 'DMG buff category 1',
              },
            ],
            stacks: 1,
          },
          {
            damageBuffs: [
              {
                elementalTypes: ['Frost'],
                value: 0.15,
                damageCategory: 'DMG buff category 2',
              },
            ],
            stacks: 1,
          },
        ] as BuffAction[]
      );

      expect(sut.getTotalDamagePercent()).toBe(3.14);
    });
  });
});
