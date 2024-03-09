import { weaponDefinitions } from '../../../constants/weapon-definitions';
import { GearSet } from '../../gear-set';
import { Loadout } from '../../loadout';
import { Team } from '../../team';
import { Weapon } from '../../weapon';
import type { Attack } from '../attack';
import type { AttackDefinition } from '../attack-definition';
import { CombatSimulator } from '../combat-simulator';
import { Relics } from '../relics';

describe('CombatSimulator', () => {
  let weapon1: Weapon;
  let weapon2: Weapon;
  let weapon3: Weapon;
  let team: Team;
  let loadout: Loadout;
  let relics: Relics;
  const combatDuration = 150000;

  let sut: CombatSimulator;

  beforeEach(() => {
    weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    weapon2 = new Weapon(weaponDefinitions.byId['Yanuo']);
    weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

    team = new Team();
    team.weapon1 = weapon1;
    team.weapon2 = weapon2;
    team.weapon3 = weapon3;

    loadout = new Loadout('loadout', 'Volt', team, new GearSet(), {
      characterLevel: 100,
    });

    relics = new Relics();

    sut = new CombatSimulator(combatDuration, loadout, relics);
  });

  describe('active weapon', () => {
    it('is the weapon that performed the latest attack', () => {
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
      expect(sut.activeWeapon).toBeUndefined();
    });
  });

  describe('available attacks', () => {
    it('includes attacks from all weapons at the start of combat', () => {
      expect(sut.availableAttacks).toMatchSnapshot();
    });

    it('does not include attacks if they are on cooldown', () => {
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
      // Invalid weapon
      expect(() => {
        sut.performAttack({
          weapon: new Weapon(weaponDefinitions.byId['Tsubasa']),
          attackDefinition: {} as AttackDefinition,
        });
      }).toThrow();
    });
  });

  describe('common weapon damage buff', () => {
    it('can be triggered by an attack', () => {
      // Brevey - Million-Metz Shockwave triggers Force Impact
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      });

      expect(
        sut.weaponDamageBuffTimelinesByBuff.get('force-impact')?.events[0]
      ).toBeDefined();
    });
  });

  describe('passive weapon attack buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const voltResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelinesByBuff.get('volt-resonance')
          ?.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();

      const frostResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelinesByBuff.get('frost-resonance')
          ?.events[0];
      expect(frostResonanceBuffEvent).toBeDefined();
      if (frostResonanceBuffEvent) {
        expect(frostResonanceBuffEvent.startTime).toBe(0);
        expect(frostResonanceBuffEvent.endTime).toBe(combatDuration);
        expect(frostResonanceBuffEvent.stacks).toBe(1);
      }
    });

    it('is not added if the elemental weapon requirement is not met', () => {
      // Test with a team of Brevey (Volt/Frost), Huang (Volt), Nan Yin (Altered) - Should only have Volt resonance but not Frost resonance
      team.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const voltResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelinesByBuff.get('volt-resonance')
          ?.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();
      if (voltResonanceBuffEvent) {
        expect(voltResonanceBuffEvent.stacks).toBe(1);
      }

      const frostResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelinesByBuff.get('frost-resonance')
          ?.events[0];
      expect(frostResonanceBuffEvent).toBeUndefined();
    });
  });

  describe('passive relic damage buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      relics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
      relics.setRelicStars('Alternate Destiny', 5); // Frost +2%
      relics.setRelicStars('Strange Cube', 3); // Volt, not activated
      relics.setRelicStars('Thalassic Heart', 4); // Volt +2%
      relics.setRelicStars('Triple Mask', 3); // All +6%

      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      expect(sut.relicPassiveDamageBuffTimelinesByBuff).toMatchSnapshot();
    });
  });
});
