import type { ElementalResonance } from '../../constants/elemental-resonance';
import { weaponDefinitions } from '../../constants/weapons/weapon-definitions';
import type { WeaponResonance } from '../../constants/weapons/weapon-resonance';
import { Team } from '../team';
import { Weapon } from '../weapon';

describe('team', () => {
  describe('elemental resonance', () => {
    it('is of an elemental resonance if there are at least 2 weapons of that elemental type', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Cocoritter']);
      expect(sut1.elementalResonances).toEqual<ElementalResonance[]>(['Frost']);

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Annabella']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Cobalt-B']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Fei Se']);
      expect(sut2.elementalResonances).toEqual<ElementalResonance[]>(['Flame']);
    });

    it('is None when there are no duplicate element types between the weapons', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Annabella']);
      expect(sut1.elementalResonances).toEqual<ElementalResonance[]>(['None']);

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Annabella']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Claudia']);
      expect(sut2.elementalResonances).toEqual<ElementalResonance[]>(['None']);
    });

    it('is dual elemental resonance when there are dual element weapons', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Ming Jing']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Yan Miao']);
      expect(sut1.elementalResonances).toEqual<ElementalResonance[]>([
        'Physical',
        'Flame',
      ]);

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Ling Han']);
      expect(sut2.elementalResonances).toEqual<ElementalResonance[]>([
        'Volt',
        'Frost',
      ]);
    });
  });

  describe('weapon resonance', () => {
    it('is Attack when there are at least 2 attack weapons', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Annabella']);
      expect(sut1.weaponResonance).toBe<WeaponResonance>('Attack');

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Annabella']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Claudia']);
      expect(sut2.weaponResonance).toBe<WeaponResonance>('Attack');
    });

    it('is Fortitude when there are at least 2 defense weapons', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Huma']);
      expect(sut1.weaponResonance).toBe<WeaponResonance>('Fortitude');

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Huma']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Lan']);
      expect(sut2.weaponResonance).toBe<WeaponResonance>('Fortitude');
    });

    it('is Benediction when there are at least 2 support weapons', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Cocoritter']);
      expect(sut1.weaponResonance).toBe<WeaponResonance>('Benediction');

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Cocoritter']);
      sut2.weapon3 = new Weapon(weaponDefinitions.byId['Fiona']);
      expect(sut2.weaponResonance).toBe<WeaponResonance>('Benediction');
    });

    it('is Balance when there is 1 weapon of each type', () => {
      const sut = new Team();
      sut.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut.weapon2 = new Weapon(weaponDefinitions.byId['Brevey']);
      sut.weapon3 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      expect(sut.weaponResonance).toBe<WeaponResonance>('Balance');
    });

    it('is None when there are only 2 weapons, and of different type', () => {
      const sut1 = new Team();
      sut1.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut1.weapon2 = new Weapon(weaponDefinitions.byId['Brevey']);
      expect(sut1.weaponResonance).toBe<WeaponResonance>('None');

      const sut2 = new Team();
      sut2.weapon1 = new Weapon(weaponDefinitions.byId['Alyss']);
      sut2.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      expect(sut2.weaponResonance).toBe<WeaponResonance>('None');

      const sut3 = new Team();
      sut3.weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
      sut3.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      expect(sut3.weaponResonance).toBe<WeaponResonance>('None');
    });
  });
});
