import { simulacrumTraits } from '../../../constants/simulacrum-traits';
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
        sut.weaponDamageBuffTimelines.get('force-impact')?.events[0]
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
        sut.weaponPassiveAttackBuffTimelines.get('volt-resonance')?.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();

      const frostResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelines.get('frost-resonance')?.events[0];
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
        sut.weaponPassiveAttackBuffTimelines.get('volt-resonance')?.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();
      if (voltResonanceBuffEvent) {
        expect(voltResonanceBuffEvent.stacks).toBe(1);
      }

      const frostResonanceBuffEvent =
        sut.weaponPassiveAttackBuffTimelines.get('frost-resonance')?.events[0];
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

      expect(sut.relicPassiveDamageBuffTimelines).toMatchSnapshot();
    });
  });

  describe('simulacrum trait', () => {
    describe('passive damage buff', () => {
      it('is added', () => {
        const breveyTrait = simulacrumTraits.byId['Brevey'];
        loadout.simulacrumTrait = breveyTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent = sut.simulacrumTraitDamageBuffTimelines.get(
          breveyTrait.passiveDamageBuffs[0].id
        )?.events[0];
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(0);
          expect(damageBuffEvent.duration).toBe(combatDuration);
        }
      });

      it('is added, or not, based on weapon requirement', () => {
        // Positive case
        const breveyTrait = simulacrumTraits.byId['Brevey'];
        loadout.simulacrumTrait = breveyTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent = sut.simulacrumTraitDamageBuffTimelines.get(
          breveyTrait.passiveDamageBuffs[1].id
        )?.events[0];
        expect(damageBuffEvent).toBeDefined();
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(0);
          expect(damageBuffEvent.duration).toBe(combatDuration);
        }

        // Negative case
        loadout.team.weapon1 = new Weapon(
          weaponDefinitions.byId['Huang (Mimi)']
        );
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon2,
          attackDefinition: weapon2.definition.normalAttacks[0],
        });

        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(
            breveyTrait.passiveDamageBuffs[1].id
          )
        ).toBe(false);
      });

      it('is added, based on the number of weapons of different elements', () => {
        const fenrirTrait = simulacrumTraits.byId['Fenrir'];
        const fenrir2ElementalTypesBuff = fenrirTrait.passiveDamageBuffs.find(
          (buff) => buff.id === 'fenrir-trait-2-elemental-types'
        );
        const fenrir3ElementalTypesBuff = fenrirTrait.passiveDamageBuffs.find(
          (buff) => buff.id === 'fenrir-trait-3-elemental-types'
        );

        if (!fenrir2ElementalTypesBuff || !fenrir3ElementalTypesBuff) {
          throw new Error();
        }

        // 3 elemental types
        loadout.simulacrumTrait = fenrirTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(
            fenrir2ElementalTypesBuff.id
          )
        ).toBe(false);
        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(
            fenrir3ElementalTypesBuff.id
          )
        ).toBe(true);

        // 2 elemental types
        team.weapon3 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(
            fenrir2ElementalTypesBuff.id
          )
        ).toBe(true);
        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(
            fenrir3ElementalTypesBuff.id
          )
        ).toBe(false);
      });

      it('is added, based on the number of weapons of an element', () => {
        const mimiTrait = simulacrumTraits.byId['Huang (Mimi)'];
        const mimiTripleVoltBuff = mimiTrait.passiveDamageBuffs.find(
          (buff) => buff.id === 'mimi-trait-triple-volt'
        );
        if (!mimiTripleVoltBuff) {
          throw new Error();
        }

        loadout.simulacrumTrait = mimiTrait;

        // Negative case
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(mimiTripleVoltBuff.id)
        ).toBe(false);

        // Positive case
        team.weapon3 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(mimiTripleVoltBuff.id)
        ).toBe(true);
      });

      it('is added, based on the team weapon resonance', () => {
        const lanTrait = simulacrumTraits.byId['Lan'];
        loadout.simulacrumTrait = lanTrait;

        // Negative case
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(
            lanTrait.passiveDamageBuffs[0].id
          )
        ).toBe(false);

        // Positive case
        team.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        team.weapon3 = new Weapon(weaponDefinitions.byId['Lan']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(
            lanTrait.passiveDamageBuffs[0].id
          )
        ).toBe(true);
      });

      it('is added only for a later segment of the combat duration', () => {
        const yanmiaoTrait = simulacrumTraits.byId['Yan Miao'];
        loadout.simulacrumTrait = yanmiaoTrait;

        team.weapon3 = new Weapon(weaponDefinitions.byId['Yan Miao']);
        sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const buffEvent = sut.simulacrumTraitDamageBuffTimelines.get(
          'yanmiao-trait-weapon-buff'
        )?.events[0];
        expect(buffEvent).toBeDefined();
        if (buffEvent) {
          expect(buffEvent.startTime).toBe(30000);
          expect(buffEvent.duration).toBe(120000);
        }
      });
    });

    describe('passive attack buff', () => {
      it('is added at start of combat', () => {
        const friggTrait = simulacrumTraits.byId['Frigg'];
        loadout.simulacrumTrait = friggTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitAttackBuffTimelines.has(
            friggTrait.passiveAttackBuffs[0].id
          )
        ).toBe(true);
      });
    });

    describe('conditional damage buff', () => {
      it('is added, triggered by any weapon skill use', () => {
        const alyssTrait = simulacrumTraits.byId['Alyss'];
        loadout.simulacrumTrait = alyssTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        const damageBuffEvent = sut.simulacrumTraitDamageBuffTimelines.get(
          alyssTrait.conditionalDamageBuffs[0].id
        )?.events[0];
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(
            sut.attackTimelines.get(weapon1)?.events[1].startTime
          );
          expect(damageBuffEvent.duration).toBe(
            loadout.simulacrumTrait.conditionalDamageBuffs[0].duration
          );
        }
      });

      it('is added on combat start', () => {
        const crowTrait = simulacrumTraits.byId['Crow'];
        loadout.simulacrumTrait = crowTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent = sut.simulacrumTraitDamageBuffTimelines.get(
          crowTrait.conditionalDamageBuffs[0].id
        )?.events[0];
        expect(damageBuffEvent).toBeDefined();
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(0);
          expect(damageBuffEvent.duration).toBe(
            crowTrait.conditionalDamageBuffs[0].duration
          );
        }
      });

      it('is added, triggered by a specific attack', () => {
        const feiseTrait = simulacrumTraits.byId['Fei Se'];
        loadout.simulacrumTrait = feiseTrait;

        // Negative case - not the specified attack
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          feiseTrait.conditionalDamageBuffs.some((buff) =>
            sut.simulacrumTraitDamageBuffTimelines.has(buff.id)
          )
        ).toBe(false);

        // Positive case
        const feiseWeapon = new Weapon(weaponDefinitions.byId['Fei Se']);
        team.weapon1 = feiseWeapon;
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });
        expect(
          feiseTrait.conditionalDamageBuffs.some((buff) =>
            sut2.simulacrumTraitDamageBuffTimelines.has(buff.id)
          )
        ).toBe(true);
      });

      it('is added, based on the number of elemental weapons in the team', () => {
        const feiseTrait = simulacrumTraits.byId['Fei Se'];
        loadout.simulacrumTrait = feiseTrait;

        const feiseWeapon = new Weapon(weaponDefinitions.byId['Fei Se']);
        const plottiWeapon = new Weapon(weaponDefinitions.byId['Plotti']);
        const yanMiaoWeapon = new Weapon(weaponDefinitions.byId['Yan Miao']);

        const feiseTrait1FlameBuff = feiseTrait.conditionalDamageBuffs.find(
          (buff) => buff.id === 'feise-trait-1-flame'
        );
        const feiseTrait2FlameBuff = feiseTrait.conditionalDamageBuffs.find(
          (buff) => buff.id === 'feise-trait-2-flame'
        );
        const feiseTrait3FlameBuff = feiseTrait.conditionalDamageBuffs.find(
          (buff) => buff.id === 'feise-trait-3-flame'
        );
        if (
          !feiseTrait1FlameBuff ||
          !feiseTrait2FlameBuff ||
          !feiseTrait3FlameBuff
        ) {
          throw new Error();
        }

        // 1 flame weapon
        team.weapon1 = feiseWeapon;
        const sut1 = new CombatSimulator(combatDuration, loadout, relics);
        sut1.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });

        expect(
          sut1.simulacrumTraitDamageBuffTimelines.has(feiseTrait1FlameBuff.id)
        ).toBe(true);
        expect(
          sut1.simulacrumTraitDamageBuffTimelines.has(feiseTrait2FlameBuff.id)
        ).toBe(false);
        expect(
          sut1.simulacrumTraitDamageBuffTimelines.has(feiseTrait3FlameBuff.id)
        ).toBe(false);

        // 2 flame weapons
        team.weapon1 = feiseWeapon;
        team.weapon2 = plottiWeapon;
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });

        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(feiseTrait1FlameBuff.id)
        ).toBe(false);
        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(feiseTrait2FlameBuff.id)
        ).toBe(true);
        expect(
          sut2.simulacrumTraitDamageBuffTimelines.has(feiseTrait3FlameBuff.id)
        ).toBe(false);

        // 3 flame weapons
        team.weapon1 = feiseWeapon;
        team.weapon2 = plottiWeapon;
        team.weapon3 = yanMiaoWeapon;
        const sut3 = new CombatSimulator(combatDuration, loadout, relics);
        sut3.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });

        expect(
          sut3.simulacrumTraitDamageBuffTimelines.has(feiseTrait1FlameBuff.id)
        ).toBe(false);
        expect(
          sut3.simulacrumTraitDamageBuffTimelines.has(feiseTrait2FlameBuff.id)
        ).toBe(false);
        expect(
          sut3.simulacrumTraitDamageBuffTimelines.has(feiseTrait3FlameBuff.id)
        ).toBe(true);
      });

      it('is added, triggered by active weapon', () => {
        const nanyinTrait = simulacrumTraits.byId['Nan Yin'];
        loadout.simulacrumTrait = nanyinTrait;

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        const attackStartTime = sut.nextEarliestAttackStartTime;
        sut.performAttack({
          weapon: weapon3, // Nan yin
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        const buffIdsToCheck = nanyinTrait.conditionalDamageBuffs.map(
          (buff) => buff.id
        );
        expect(
          Array.from(sut.simulacrumTraitDamageBuffTimelines.keys()).some(
            (buffId) => buffIdsToCheck.includes(buffId)
          )
        ).toBe(true);

        for (const [
          buffId,
          timeline,
        ] of sut.simulacrumTraitDamageBuffTimelines) {
          if (!buffIdsToCheck.includes(buffId)) continue;

          expect(timeline.events.length).toBe(1);
          expect(timeline.lastEvent?.startTime).toBe(attackStartTime);
          expect(timeline.lastEvent?.duration).toBe(
            weapon3.definition.normalAttacks[0].duration
          );
        }
      });

      it('is added, based on the number of weapons that are not of an elemental type', () => {
        const nanyinTrait = simulacrumTraits.byId['Nan Yin'];
        loadout.simulacrumTrait = nanyinTrait;

        const nanyin1NonAlteredBuffId =
          'nanyin-trait-active-weapon-1-non-altered';
        const nanyin2NanAlteredBuffId =
          'nanyin-trait-active-weapon-2-non-altered';

        // 2 non-altered weapons
        sut.performAttack({
          weapon: weapon3, // nan yin
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(nanyin1NonAlteredBuffId)
        ).toBe(false);
        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(nanyin2NanAlteredBuffId)
        ).toBe(true);

        // 1 non-altered weapon
        team.weapon1 = new Weapon(weaponDefinitions.byId['Fiona']);
        sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon3,
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(nanyin1NonAlteredBuffId)
        ).toBe(true);
        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(nanyin2NanAlteredBuffId)
        ).toBe(false);
      });

      it('is added, triggered by weapon skill of a specific element weapon', () => {
        const tianLangTrait = simulacrumTraits.byId['Tian Lang'];
        loadout.simulacrumTrait = tianLangTrait;

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(
            tianLangTrait.conditionalDamageBuffs[0].id
          )
        ).toBe(true);
      });

      it('is added, triggered by weapon discharge of a specific element weapon', () => {
        const tianLangTrait = simulacrumTraits.byId['Tian Lang'];
        loadout.simulacrumTrait = tianLangTrait;

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        expect(
          sut.simulacrumTraitDamageBuffTimelines.has(
            tianLangTrait.conditionalDamageBuffs[0].id
          )
        ).toBe(true);
      });
    });

    describe('conditional attack buff', () => {
      it('is added, triggered by weapon skill with a weapon type requirement', () => {
        // Positive case - support weapon required
        const cocoTrait = simulacrumTraits.byId['Cocoritter'];
        loadout.simulacrumTrait = cocoTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        const attackBuffEvent = sut.simulacrumTraitAttackBuffTimelines.get(
          cocoTrait.conditionalAttackBuffs[0].id
        )?.events[0];
        expect(attackBuffEvent).toBeDefined();
        if (attackBuffEvent) {
          expect(attackBuffEvent.startTime).toBe(0);
          expect(attackBuffEvent.duration).toBe(
            cocoTrait.conditionalAttackBuffs[0].duration
          );
        }

        // Negative case
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon2,
          attackDefinition: weapon2.definition.skills[0],
        });

        expect(
          sut2.simulacrumTraitAttackBuffTimelines.has(
            cocoTrait.conditionalAttackBuffs[0].id
          )
        ).toBe(false);
      });

      it('is added, triggered by weapon discharge with a weapon type requirement', () => {
        // Positive case - support weapon required
        const cocoTrait = simulacrumTraits.byId['Cocoritter'];
        loadout.simulacrumTrait = cocoTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        const attackBuffEvent = sut.simulacrumTraitAttackBuffTimelines.get(
          cocoTrait.conditionalAttackBuffs[0].id
        )?.events[0];
        expect(attackBuffEvent).toBeDefined();
        if (attackBuffEvent) {
          expect(attackBuffEvent.startTime).toBe(0);
          expect(attackBuffEvent.duration).toBe(
            cocoTrait.conditionalAttackBuffs[0].duration
          );
        }

        // Negative case
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon2,
          attackDefinition: weapon2.definition.skills[0],
        });

        expect(
          sut2.simulacrumTraitAttackBuffTimelines.has(
            cocoTrait.conditionalAttackBuffs[0].id
          )
        ).toBe(false);
      });

      it('is added, triggered by a specific weapon attack', () => {
        const rubyTrait = simulacrumTraits.byId['Ruby'];
        const rubyWeapon = new Weapon(weaponDefinitions.byId['Ruby']);

        loadout.simulacrumTrait = rubyTrait;
        team.weapon1 = rubyWeapon;
        sut = new CombatSimulator(combatDuration, loadout, relics);

        sut.performAttack({
          weapon: rubyWeapon,
          attackDefinition: rubyWeapon.definition.dodgeAttacks[0],
        });

        expect(
          sut.simulacrumTraitAttackBuffTimelines.has(
            rubyTrait.conditionalAttackBuffs[0].id
          )
        ).toBe(true);
      });

      it('is added, triggered by any weapon skill', () => {
        const shiroTrait = simulacrumTraits.byId['Shiro'];
        loadout.simulacrumTrait = shiroTrait;

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        const buffIdsToCheck = shiroTrait.conditionalAttackBuffs.map(
          (buff) => buff.id
        );
        const addedBuffIds = Array.from(
          sut.simulacrumTraitAttackBuffTimelines.keys()
        );
        expect(addedBuffIds.length).not.toBe(0);
        expect(
          addedBuffIds.every((buffId) => buffIdsToCheck.includes(buffId))
        ).toBe(true);
      });

      it('is added, triggered by any weapon discharge', () => {
        const shiroTrait = simulacrumTraits.byId['Shiro'];
        loadout.simulacrumTrait = shiroTrait;

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        const buffIdsToCheck = shiroTrait.conditionalAttackBuffs.map(
          (buff) => buff.id
        );
        const addedBuffIds = Array.from(
          sut.simulacrumTraitAttackBuffTimelines.keys()
        );
        expect(addedBuffIds.length).not.toBe(0);
        expect(
          addedBuffIds.every((buffId) => buffIdsToCheck.includes(buffId))
        ).toBe(true);
      });
    });

    describe('passive miscellaneous buff', () => {
      it('is added at the start of combat', () => {
        const mingJingTrait = simulacrumTraits.byId['Ming Jing'];
        loadout.simulacrumTrait = mingJingTrait;
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(sut.simulacrumTraitMiscBuffTimelines.size).toBe(1);
      });
    });

    describe('conditional miscellaneous buff', () => {
      it('is added, triggered by specific weapon normal attack', () => {
        const mingJingTrait = simulacrumTraits.byId['Ming Jing'];
        const mingJingWeapon = new Weapon(weaponDefinitions.byId['Ming Jing']);

        loadout.simulacrumTrait = mingJingTrait;
        team.weapon3 = mingJingWeapon;
        sut = new CombatSimulator(combatDuration, loadout, relics);

        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        const attackStartTime = sut.nextEarliestAttackStartTime;
        sut.performAttack({
          weapon: mingJingWeapon,
          attackDefinition: mingJingWeapon.definition.normalAttacks[0],
        });

        const buff = mingJingTrait.conditionalMiscellaneousBuffs[0];
        const buffTimeline = sut.simulacrumTraitMiscBuffTimelines.get(buff.id);
        expect(buffTimeline).toBeDefined();
        if (buffTimeline) {
          expect(buffTimeline.events.length).toBe(1);
          expect(buffTimeline.lastEvent?.startTime).toBe(attackStartTime);
          expect(buffTimeline.lastEvent?.duration).toBe(
            mingJingWeapon.definition.normalAttacks[0].duration
          );
        }
      });

      it('is added, based on the number of elemental weapons', () => {
        const yanmiaoTrait = simulacrumTraits.byId['Yan Miao'];
        const yanmiaoWeapon = new Weapon(weaponDefinitions.byId['Yan Miao']);

        const yanmiaoTrait1PhysBuff =
          yanmiaoTrait.conditionalMiscellaneousBuffs.find(
            (buff) => buff.id === 'yanmiao-trait-normal-atk-buff-1-phys'
          );
        const yanmiaoTrait2PhysBuff =
          yanmiaoTrait.conditionalMiscellaneousBuffs.find(
            (buff) => buff.id === 'yanmiao-trait-normal-atk-buff-2-phys'
          );
        const yanmiaoTrait3PhysBuff =
          yanmiaoTrait.conditionalMiscellaneousBuffs.find(
            (buff) => buff.id === 'yanmiao-trait-normal-atk-buff-3-phys'
          );

        if (
          !yanmiaoTrait1PhysBuff ||
          !yanmiaoTrait2PhysBuff ||
          !yanmiaoTrait3PhysBuff
        ) {
          throw new Error();
        }

        // 1 Phys weapon
        loadout.simulacrumTrait = yanmiaoTrait;
        team.weapon1 = yanmiaoWeapon;
        sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: yanmiaoWeapon,
          attackDefinition: yanmiaoWeapon.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait1PhysBuff.id)
        ).toBe(true);
        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait2PhysBuff.id)
        ).toBe(false);
        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait3PhysBuff.id)
        ).toBe(false);

        // 2 Phys weapon
        team.weapon2 = new Weapon(weaponDefinitions.byId['Plotti']);
        sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: yanmiaoWeapon,
          attackDefinition: yanmiaoWeapon.definition.normalAttacks[0],
        });

        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait1PhysBuff.id)
        ).toBe(false);
        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait2PhysBuff.id)
        ).toBe(true);
        expect(
          sut.simulacrumTraitMiscBuffTimelines.has(yanmiaoTrait3PhysBuff.id)
        ).toBe(false);
      });
    });
  });
});
