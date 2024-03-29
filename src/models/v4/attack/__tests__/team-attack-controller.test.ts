import type { WeaponElementalType } from '../../../../constants/elemental-type';
import { weaponDefinitions } from '../../../../constants/weapon-definitions';
import { Team } from '../../../team';
import { Weapon } from '../../../weapon';
import { ChargeTimeline } from '../../charge/charge-timeline';
import type { AttackDefinition } from '../attack-definition';
import { TeamAttackController } from '../team-attack-controller';

describe('TeamAttackController', () => {
  let weapon1: Weapon;
  let weapon2: Weapon;
  let weapon3: Weapon;
  let team: Team;
  let chargeTimeline: ChargeTimeline;
  const combatDuration = 150000;

  beforeEach(() => {
    weapon1 = new Weapon(weaponDefinitions.byId['Brevey']);
    weapon2 = new Weapon(weaponDefinitions.byId['Yanuo']);
    weapon3 = new Weapon(weaponDefinitions.byId['Nan Yin']);

    team = new Team();
    team.weapon1 = weapon1;
    team.weapon2 = weapon2;
    team.weapon3 = weapon3;

    chargeTimeline = new ChargeTimeline(combatDuration);
  });

  describe('active weapon', () => {
    it('is the weapon that performed the latest attack', () => {
      const sut = new TeamAttackController(
        team,
        combatDuration,
        chargeTimeline
      );
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
      const sut = new TeamAttackController(
        team,
        combatDuration,
        chargeTimeline
      );
      expect(sut.activeWeapon).toBeUndefined();
    });
  });

  describe('perform attack', () => {
    it('throws error if the attack is not in the list of available attacks', () => {
      // Invalid weapon
      expect(() => {
        const sut = new TeamAttackController(
          team,
          combatDuration,
          chargeTimeline
        );
        sut.performAttack({
          weapon: new Weapon(weaponDefinitions.byId['Tsubasa']),
          attackDefinition: {} as AttackDefinition,
        });
      }).toThrow();
    });

    it("changes the attack's element to follow that of the previous weapon", () => {
      // Test nan yin attacks (that copy the previous weapon's element)
      const sut = new TeamAttackController(
        team,
        combatDuration,
        chargeTimeline
      );

      const attackResult1 = sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(attackResult1.elementalType).toBe<WeaponElementalType>('Altered');

      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const attackResult2 = sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(attackResult2.elementalType).toBe<WeaponElementalType>('Volt');
    });
  });
});
