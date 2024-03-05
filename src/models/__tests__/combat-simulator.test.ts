import { weaponDefinitions } from '../../constants/weapon-definitions';
import { CombatSimulator } from '../combat-simulator';
import { GearSet } from '../gear-set';
import { Loadout } from '../loadout';
import { Relics } from '../relics';
import { Team } from '../team';
import type { Attack } from '../v4/attack';
import type { AttackDefinition } from '../v4/attack-definition';
import { Weapon } from '../weapon';

describe('CombatSimulator', () => {
  const weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
  const weapon2 = new Weapon(weaponDefinitions.byId['Yanuo']);
  const weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

  const team = new Team();
  team.weapon1 = weapon1;
  team.weapon2 = weapon2;
  team.weapon3 = weapon3;

  const loadout = new Loadout('loadout', 'Volt', team, new GearSet(), {
    characterLevel: 100,
  });

  const relics = new Relics();

  const combatDuration = 150000;

  describe('active weapon', () => {
    it('is the weapon that performed the latest attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      expect(sut.activeWeapon).toBe(weapon1);

      sut.performAttack({
        weapon: weapon2,
        attackDefinition: weapon2.definition.normalAttacks[0],
      });
      expect(sut.activeWeapon).toBe(weapon2);
    });

    it('is undefined if there is no latest attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      expect(sut.activeWeapon).toBeUndefined();
    });
  });

  describe('available attacks', () => {
    it('includes attacks from all weapons at the start of combat', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      expect(sut.availableAttacks).toMatchSnapshot();
    });

    it('does not include attacks if they are on cooldown', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      const attack: Attack = {
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      };
      sut.performAttack(attack);

      expect(sut.availableAttacks).not.toContainEqual(attack);
    });
  });

  describe('perform attack', () => {
    it('throws error if the attack is not in the list of available attacks', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);

      // Invalid weapon
      expect(() => {
        sut.performAttack({
          weapon: new Weapon(weaponDefinitions.byId['Tsubasa']),
          attackDefinition: {} as AttackDefinition,
        });
      }).toThrow();
    });
  });

  describe('passive weapon attack buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const voltResonanceBuffEvent =
        sut.weaponAttackBuffTimelinesByBuff.get('volt-resonance')?.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();

      const frostResonanceBuffEvent =
        sut.weaponAttackBuffTimelinesByBuff.get('frost-resonance')?.events[0];
      expect(frostResonanceBuffEvent).toBeDefined();
      if (frostResonanceBuffEvent) {
        expect(frostResonanceBuffEvent.startTime).toBe(0);
        expect(frostResonanceBuffEvent.endTime).toBe(combatDuration);
        expect(frostResonanceBuffEvent.stacks).toBe(1);
      }
    });
  });

  describe('passive relic damage buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      const customRelics = new Relics();
      customRelics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
      customRelics.setRelicStars('Alternate Destiny', 5); // Frost +2%
      customRelics.setRelicStars('Strange Cube', 3); // Volt, not activated
      customRelics.setRelicStars('Thalassic Heart', 4); // Volt +2%

      const sut = new CombatSimulator(combatDuration, loadout, customRelics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      expect(sut.relicPassiveDamageBuffTimelinesByBuff).toMatchSnapshot();
    });
  });
});
