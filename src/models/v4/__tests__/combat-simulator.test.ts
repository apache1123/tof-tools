import { fullCharge, maxCharge } from '../../../constants/combat';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import { simulacrumTraits } from '../../../constants/simulacrum-traits';
import { weaponDefinitions } from '../../../constants/weapon-definitions';
import { repeat } from '../../../utils/test-utils';
import { GearSet } from '../../gear-set';
import { Loadout } from '../../loadout';
import { Team } from '../../team';
import { Weapon } from '../../weapon';
import type { AttackDefinition } from '../attack/attack-definition';
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
  });

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

      const attack = {
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      };
      sut.performAttack(attack);

      expect(sut.availableAttacks).not.toContainEqual(attack);
    });

    it('does not include discharges if there is no full charge available', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      expect(
        sut.availableAttacks.some(
          (attack) => attack.attackDefinition.type === 'discharge'
        )
      ).toBe(false);

      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      expect(
        sut.availableAttacks.some(
          (attack) => attack.attackDefinition.type === 'discharge'
        )
      ).toBe(false);
    });

    it('includes discharges from weapons that are not the active weapon, if there is a full charge available', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      // Ensure full charge
      repeat(() => {
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
      }, 20);

      const dischargeAttacks = sut.availableAttacks.filter(
        (attack) => attack.attackDefinition.type === 'discharge'
      );
      expect(dischargeAttacks.length).not.toBe(0);
      expect(
        dischargeAttacks.every((attack) => attack.weapon !== weapon1)
      ).toBe(true);
    });
  });

  describe('perform attack', () => {
    it('throws error if the attack is not in the list of available attacks', () => {
      // Invalid weapon
      expect(() => {
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: new Weapon(weaponDefinitions.byId['Tsubasa']),
          attackDefinition: {} as AttackDefinition,
        });
      }).toThrow();
    });

    it("changes the attack's element to follow that of the previous weapon", () => {
      // Test nan yin attacks
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(
        sut.attackTimelines.get(weapon3)?.lastEvent?.elementalType
      ).toBe<WeaponElementalType>('Altered');

      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(
        sut.attackTimelines.get(weapon3)?.lastEvent?.elementalType
      ).toBe<WeaponElementalType>('Volt');
    });
  });

  describe('common weapon damage buff', () => {
    it('can be triggered by an attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      // Brevey - Million-Metz Shockwave triggers Force Impact
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      });

      expect(hasEffectEvent(sut, 'force-impact')).toBe(true);
    });
  });

  describe('common weapon attack buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      expect(hasEffectEvent(sut, 'volt-resonance')).toBe(true);

      const frostResonanceBuffEvent =
        sut.effectPool.getEffect('frost-resonance')?.timeline.events[0];
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
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const voltResonanceBuffEvent =
        sut.effectPool.getEffect('volt-resonance')?.timeline.events[0];
      expect(voltResonanceBuffEvent).toBeDefined();
      if (voltResonanceBuffEvent) {
        expect(voltResonanceBuffEvent.stacks).toBe(1);
      }

      expect(hasEffectEvent(sut, 'frost-resonance')).toBe(false);
    });

    it('is not added twice', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      expect(
        Array.from(
          sut.effectPool
            .getEffectGroup('Weapon attack buffs')
            ?.items.values() || []
        ).filter((effect) => effect.id === 'volt-resonance').length
      ).toBe(1);
    });
  });

  describe('weapon attack buff', () => {
    it('is added at the start of combat and lasts until the end of combat', () => {
      // Test nan yin final tune
      team.weapon1 = new Weapon(weaponDefinitions.byId['Lin']);
      team.weapon2 = new Weapon(weaponDefinitions.byId['Fiona']);
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });

      const effect = sut.effectPool.getEffect(
        weaponDefinitions.byId['Nan Yin'].attackBuffs[0].id
      );
      expect(effect).toBeDefined();
      if (effect) {
        expect(effect.timeline.events.length).toBe(1);
        expect(effect.timeline.lastEvent?.startTime).toBe(0);
        expect(effect.timeline.lastEvent?.endTime).toBe(combatDuration);
      }
    });

    it('is added based on an elemental weapon requirement', () => {
      // Test nan yin final tune
      // Negative case
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(
        hasEffectEvent(sut, weaponDefinitions.byId['Nan Yin'].attackBuffs[0].id)
      ).toBe(false);

      // Positive case
      team.weapon1 = new Weapon(weaponDefinitions.byId['Lin']);
      team.weapon2 = new Weapon(weaponDefinitions.byId['Fiona']);
      const sut2 = new CombatSimulator(combatDuration, loadout, relics);
      sut2.performAttack({
        weapon: weapon3,
        attackDefinition: weapon3.definition.normalAttacks[0],
      });
      expect(
        hasEffectEvent(
          sut2,
          weaponDefinitions.byId['Nan Yin'].attackBuffs[0].id
        )
      ).toBe(true);
    });
  });

  describe('weapon damage buff', () => {
    it('is added based on an active effect, active/not-active weapon', () => {
      // Test Brevey's volt buff and frost buff during her Pact Amplification
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      });
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      sut.performAttack({
        weapon: weapon2,
        attackDefinition: weapon2.definition.normalAttacks[0],
      });

      const voltBuffEvent = sut.effectPool.getEffect(
        'brevey-damage-buff-pact-amplification-volt'
      )?.timeline.lastEvent;
      expect(voltBuffEvent).toBeDefined();
      if (voltBuffEvent) {
        expect(voltBuffEvent.startTime).toBe(
          sut.attackTimelines.get(weapon1)?.events[1].startTime
        );
        expect(voltBuffEvent.endTime).toBe(
          sut.attackTimelines.get(weapon1)?.events[2].endTime
        );
      }

      const frostBuffEvent = sut.effectPool.getEffect(
        'brevey-damage-buff-pact-amplification-frost'
      )?.timeline.lastEvent;
      expect(frostBuffEvent).toBeDefined();
      if (frostBuffEvent) {
        expect(frostBuffEvent.startTime).toBe(
          sut.attackTimelines.get(weapon2)?.lastEvent?.startTime
        );
        expect(frostBuffEvent.endTime).toBe(
          sut.attackTimelines.get(weapon2)?.lastEvent?.endTime
        );
      }
    });
  });

  describe('relic damage buff', () => {
    it('is added at the start of combat and lasts for the entire combat duration', () => {
      relics.setRelicStars('Cybernetic Arm', 4); // Frost +1.5%
      relics.setRelicStars('Alternate Destiny', 5); // Frost +2%
      relics.setRelicStars('Strange Cube', 3); // Volt, not activated
      relics.setRelicStars('Thalassic Heart', 4); // Volt +2%
      relics.setRelicStars('Triple Mask', 3); // All +6%

      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });

      const effectGroup = sut.effectPool.getEffectGroup('Relic damage buffs');
      expect(effectGroup).toBeDefined();
      if (effectGroup) {
        expect(
          Array.from(effectGroup.items.values()).map(
            (effect) => effect.timeline
          )
        ).toMatchSnapshot();
      }
    });
  });

  describe('simulacrum trait', () => {
    describe('damage buff', () => {
      it('is added on combat start and last until combat end', () => {
        const breveyTrait = simulacrumTraits.byId['Brevey'];
        loadout.simulacrumTrait = breveyTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent =
          sut.effectPool.getEffect('brevey-trait')?.timeline.events[0];
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(0);
          expect(damageBuffEvent.duration).toBe(combatDuration);
        }
      });

      it('is added, or not, based on weapon requirement', () => {
        // Positive case
        const breveyTrait = simulacrumTraits.byId['Brevey'];
        loadout.simulacrumTrait = breveyTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent = sut.effectPool.getEffect(
          'brevey-trait-additional'
        )?.timeline.events[0];
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

        expect(hasEffectEvent(sut2, 'brevey-trait-additional')).toBe(false);
      });

      it('is added, based on the number of weapons of different elements', () => {
        const fenrirTrait = simulacrumTraits.byId['Fenrir'];
        const fenrir2ElementalTypesBuff = fenrirTrait.damageBuffs.find(
          (buff) => buff.id === 'fenrir-trait-2-elemental-types'
        );
        const fenrir3ElementalTypesBuff = fenrirTrait.damageBuffs.find(
          (buff) => buff.id === 'fenrir-trait-3-elemental-types'
        );

        if (!fenrir2ElementalTypesBuff || !fenrir3ElementalTypesBuff) {
          throw new Error();
        }

        loadout.simulacrumTrait = fenrirTrait;

        // 3 elemental types
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut, fenrir2ElementalTypesBuff.id)).toBe(false);
        expect(hasEffectEvent(sut, fenrir3ElementalTypesBuff.id)).toBe(true);

        // 2 elemental types
        team.weapon3 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut2, fenrir2ElementalTypesBuff.id)).toBe(true);
        expect(hasEffectEvent(sut2, fenrir3ElementalTypesBuff.id)).toBe(false);
      });

      it('is added, based on the number of weapons of an element', () => {
        const mimiTrait = simulacrumTraits.byId['Huang (Mimi)'];
        const mimiTripleVoltBuff = mimiTrait.damageBuffs.find(
          (buff) => buff.id === 'mimi-trait-triple-volt'
        );
        if (!mimiTripleVoltBuff) {
          throw new Error();
        }

        loadout.simulacrumTrait = mimiTrait;

        // Negative case
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(hasEffectEvent(sut, mimiTripleVoltBuff.id)).toBe(false);

        // Positive case
        team.weapon3 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(hasEffectEvent(sut2, mimiTripleVoltBuff.id)).toBe(true);
      });

      it('is added, based on the team weapon resonance', () => {
        const lanTrait = simulacrumTraits.byId['Lan'];
        loadout.simulacrumTrait = lanTrait;

        // Negative case
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(hasEffectEvent(sut, 'lan-trait')).toBe(false);

        // Positive case
        team.weapon2 = new Weapon(weaponDefinitions.byId['Huang (Mimi)']);
        team.weapon3 = new Weapon(weaponDefinitions.byId['Lan']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(hasEffectEvent(sut2, 'lan-trait')).toBe(true);
      });

      it('is added only for a later segment of the combat duration', () => {
        const yanmiaoTrait = simulacrumTraits.byId['Yan Miao'];
        loadout.simulacrumTrait = yanmiaoTrait;
        team.weapon3 = new Weapon(weaponDefinitions.byId['Yan Miao']);

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const buffEvent = sut.effectPool.getEffect('yanmiao-trait-weapon-buff')
          ?.timeline.events[0];
        expect(buffEvent).toBeDefined();
        if (buffEvent) {
          expect(buffEvent.startTime).toBe(30000);
          expect(buffEvent.duration).toBe(120000);
        }
      });

      it('is added, triggered by any weapon skill use', () => {
        const alyssTrait = simulacrumTraits.byId['Alyss'];
        loadout.simulacrumTrait = alyssTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        const damageBuffEvent = sut.effectPool.getEffect(
          alyssTrait.damageBuffs[0].id
        )?.timeline.events[0];
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(
            sut.attackTimelines.get(weapon1)?.events[1].startTime
          );
          expect(damageBuffEvent.duration).toBe(
            loadout.simulacrumTrait.damageBuffs[0].duration.value
          );
        }
      });

      it('is added on combat start with a defined duration', () => {
        const crowTrait = simulacrumTraits.byId['Crow'];
        loadout.simulacrumTrait = crowTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        const damageBuffEvent = sut.effectPool.getEffect(
          crowTrait.damageBuffs[1].id
        )?.timeline.events[0];
        expect(damageBuffEvent).toBeDefined();
        if (damageBuffEvent) {
          expect(damageBuffEvent.startTime).toBe(0);
          expect(damageBuffEvent.duration).toBe(
            crowTrait.damageBuffs[1].duration.value
          );
        }
      });

      it('is added, triggered by a specific attack', () => {
        const feiseTrait = simulacrumTraits.byId['Fei Se'];
        loadout.simulacrumTrait = feiseTrait;

        // Negative case - not the specified attack
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        expect(
          feiseTrait.damageBuffs.some(
            (buff) => !!sut.effectPool.getEffect(buff.id)?.timeline.lastEvent
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
          feiseTrait.damageBuffs.some(
            (buff) => !!sut2.effectPool.getEffect(buff.id)?.timeline.lastEvent
          )
        ).toBe(true);
      });

      it('is added, based on the number of elemental weapons in the team', () => {
        const feiseTrait = simulacrumTraits.byId['Fei Se'];
        loadout.simulacrumTrait = feiseTrait;

        const feiseWeapon = new Weapon(weaponDefinitions.byId['Fei Se']);
        const plottiWeapon = new Weapon(weaponDefinitions.byId['Plotti']);
        const yanMiaoWeapon = new Weapon(weaponDefinitions.byId['Yan Miao']);

        const feiseTrait1FlameBuff = feiseTrait.damageBuffs.find(
          (buff) => buff.id === 'feise-trait-1-flame'
        );
        const feiseTrait2FlameBuff = feiseTrait.damageBuffs.find(
          (buff) => buff.id === 'feise-trait-2-flame'
        );
        const feiseTrait3FlameBuff = feiseTrait.damageBuffs.find(
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

        expect(hasEffectEvent(sut1, feiseTrait1FlameBuff.id)).toBe(true);
        expect(hasEffectEvent(sut1, feiseTrait2FlameBuff.id)).toBe(false);
        expect(hasEffectEvent(sut1, feiseTrait3FlameBuff.id)).toBe(false);

        // 2 flame weapons
        team.weapon1 = feiseWeapon;
        team.weapon2 = plottiWeapon;
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });

        expect(hasEffectEvent(sut2, feiseTrait1FlameBuff.id)).toBe(false);
        expect(hasEffectEvent(sut2, feiseTrait2FlameBuff.id)).toBe(true);
        expect(hasEffectEvent(sut2, feiseTrait3FlameBuff.id)).toBe(false);

        // 3 flame weapons
        team.weapon1 = feiseWeapon;
        team.weapon2 = plottiWeapon;
        team.weapon3 = yanMiaoWeapon;
        const sut3 = new CombatSimulator(combatDuration, loadout, relics);
        sut3.performAttack({
          weapon: feiseWeapon,
          attackDefinition: feiseWeapon.definition.skills[0],
        });

        expect(hasEffectEvent(sut3, feiseTrait1FlameBuff.id)).toBe(false);
        expect(hasEffectEvent(sut3, feiseTrait2FlameBuff.id)).toBe(false);
        expect(hasEffectEvent(sut3, feiseTrait3FlameBuff.id)).toBe(true);
      });

      it('is added, triggered by active weapon', () => {
        const nanyinTrait = simulacrumTraits.byId['Nan Yin'];
        loadout.simulacrumTrait = nanyinTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        const attackStartTime = sut.nextEarliestAttackStartTime;
        sut.performAttack({
          weapon: weapon3, // Nan yin
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        const buff = sut.effectPool.getEffect(
          'nanyin-trait-active-weapon-2-non-altered'
        );
        expect(buff).toBeDefined();
        if (buff) {
          expect(buff.timeline.events.length).toBe(1);
          expect(buff.timeline.lastEvent?.startTime).toBe(attackStartTime);
          expect(buff.timeline.lastEvent?.duration).toBe(
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
        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon3, // nan yin
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut, nanyin1NonAlteredBuffId)).toBe(false);
        expect(hasEffectEvent(sut, nanyin2NanAlteredBuffId)).toBe(true);

        // 1 non-altered weapon
        team.weapon1 = new Weapon(weaponDefinitions.byId['Fiona']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon3,
          attackDefinition: weapon3.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut2, nanyin1NonAlteredBuffId)).toBe(true);
        expect(hasEffectEvent(sut2, nanyin2NanAlteredBuffId)).toBe(false);
      });

      it('is added, triggered by weapon skill of a specific element weapon', () => {
        const tianLangTrait = simulacrumTraits.byId['Tian Lang'];
        loadout.simulacrumTrait = tianLangTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        expect(hasEffectEvent(sut, 'tianlang-trait')).toBe(true);
      });

      it('is added, triggered by weapon discharge of a specific element weapon', () => {
        const tianLangTrait = simulacrumTraits.byId['Tian Lang'];
        loadout.simulacrumTrait = tianLangTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        // Ensure full charge
        repeat(() => {
          sut.performAttack({
            weapon: weapon2,
            attackDefinition: weapon2.definition.normalAttacks[0],
          });
        }, 20);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        expect(hasEffectEvent(sut, 'tianlang-trait')).toBe(true);
      });
    });

    describe('attack buff', () => {
      it('is added at start of combat', () => {
        const friggTrait = simulacrumTraits.byId['Frigg'];
        loadout.simulacrumTrait = friggTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut, 'frigg-trait')).toBe(true);
      });

      it('is added, triggered by weapon skill with a weapon type requirement', () => {
        // Positive case - support weapon required
        const cocoTrait = simulacrumTraits.byId['Cocoritter'];
        loadout.simulacrumTrait = cocoTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        const attackBuffEvent = sut.effectPool.getEffect(
          cocoTrait.attackBuffs[0].id
        )?.timeline.events[0];
        expect(attackBuffEvent).toBeDefined();
        if (attackBuffEvent) {
          expect(attackBuffEvent.startTime).toBe(0);
          expect(attackBuffEvent.duration).toBe(
            cocoTrait.attackBuffs[0].duration.value
          );
        }

        // Negative case
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: weapon2,
          attackDefinition: weapon2.definition.skills[0],
        });

        expect(hasEffectEvent(sut2, cocoTrait.attackBuffs[0].id)).toBe(false);
      });

      it('is added, triggered by weapon discharge with a weapon type requirement', () => {
        // Positive case - support weapon required
        const cocoTrait = simulacrumTraits.byId['Cocoritter'];
        loadout.simulacrumTrait = cocoTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        // Ensure full charge
        repeat(() => {
          sut.performAttack({
            weapon: weapon2,
            attackDefinition: weapon2.definition.normalAttacks[0],
          });
        }, 20);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        const attackBuffEvent = sut.effectPool.getEffect(
          cocoTrait.attackBuffs[0].id
        )?.timeline.events[0];
        expect(attackBuffEvent).toBeDefined();
        if (attackBuffEvent) {
          expect(attackBuffEvent.startTime).toBe(
            weapon2.definition.normalAttacks[0].duration * 20
          );
          expect(attackBuffEvent.duration).toBe(
            cocoTrait.attackBuffs[0].duration.value
          );
        }

        // Negative case
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        // Ensure full charge
        repeat(() => {
          sut2.performAttack({
            weapon: weapon1,
            attackDefinition: weapon1.definition.normalAttacks[0],
          });
        }, 20);
        sut2.performAttack({
          weapon: weapon2,
          attackDefinition: weapon2.definition.discharge,
        });

        expect(hasEffectEvent(sut2, cocoTrait.attackBuffs[0].id)).toBe(false);
      });

      it('is added, triggered by a specific weapon attack', () => {
        const rubyTrait = simulacrumTraits.byId['Ruby'];
        const rubyWeapon = new Weapon(weaponDefinitions.byId['Ruby']);

        loadout.simulacrumTrait = rubyTrait;
        team.weapon1 = rubyWeapon;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: rubyWeapon,
          attackDefinition: rubyWeapon.definition.dodgeAttacks[0],
        });

        expect(hasEffectEvent(sut, 'ruby-trait-dolly-atk')).toBe(true);
      });

      it('is added, triggered by any weapon skill', () => {
        const shiroTrait = simulacrumTraits.byId['Shiro'];
        loadout.simulacrumTrait = shiroTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.skills[0],
        });

        expect(hasEffectEvent(sut, 'shiro-trait-all-atk')).toBe(true);
      });

      it('is added, triggered by any weapon discharge', () => {
        const shiroTrait = simulacrumTraits.byId['Shiro'];
        loadout.simulacrumTrait = shiroTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        // Ensure full charge
        repeat(() => {
          sut.performAttack({
            weapon: weapon2,
            attackDefinition: weapon2.definition.normalAttacks[0],
          });
        }, 20);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.discharge,
        });

        expect(hasEffectEvent(sut, 'shiro-trait-all-atk')).toBe(true);
      });
    });

    describe('miscellaneous buff', () => {
      it('is added at the start of combat', () => {
        const mingJingTrait = simulacrumTraits.byId['Ming Jing'];
        loadout.simulacrumTrait = mingJingTrait;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut, 'mingjing-trait-physical-increase')).toBe(
          true
        );
      });

      it('is added, triggered by specific weapon normal attack', () => {
        const mingJingTrait = simulacrumTraits.byId['Ming Jing'];
        const mingJingWeapon = new Weapon(weaponDefinitions.byId['Ming Jing']);

        loadout.simulacrumTrait = mingJingTrait;
        team.weapon3 = mingJingWeapon;

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
        const attackStartTime = sut.nextEarliestAttackStartTime;
        sut.performAttack({
          weapon: mingJingWeapon,
          attackDefinition: mingJingWeapon.definition.normalAttacks[0],
        });

        const buff = sut.effectPool.getEffect('mingjing-trait-normal-attack');
        expect(buff).toBeDefined();
        if (buff) {
          expect(buff.timeline.events.length).toBe(1);
          expect(buff.timeline.lastEvent?.startTime).toBe(attackStartTime);
          expect(buff.timeline.lastEvent?.duration).toBe(
            mingJingWeapon.definition.normalAttacks[0].duration
          );
        }
      });

      it('is added, based on the number of elemental weapons', () => {
        const yanmiaoTrait = simulacrumTraits.byId['Yan Miao'];
        const yanmiaoWeapon = new Weapon(weaponDefinitions.byId['Yan Miao']);

        const yanmiaoTrait1PhysBuff = yanmiaoTrait.miscellaneousBuffs.find(
          (buff) => buff.id === 'yanmiao-trait-normal-atk-buff-1-phys'
        );
        const yanmiaoTrait2PhysBuff = yanmiaoTrait.miscellaneousBuffs.find(
          (buff) => buff.id === 'yanmiao-trait-normal-atk-buff-2-phys'
        );
        const yanmiaoTrait3PhysBuff = yanmiaoTrait.miscellaneousBuffs.find(
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

        const sut = new CombatSimulator(combatDuration, loadout, relics);
        sut.performAttack({
          weapon: yanmiaoWeapon,
          attackDefinition: yanmiaoWeapon.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut, yanmiaoTrait1PhysBuff.id)).toBe(true);
        expect(hasEffectEvent(sut, yanmiaoTrait2PhysBuff.id)).toBe(false);
        expect(hasEffectEvent(sut, yanmiaoTrait3PhysBuff.id)).toBe(false);

        // 2 Phys weapon
        team.weapon2 = new Weapon(weaponDefinitions.byId['Plotti']);
        const sut2 = new CombatSimulator(combatDuration, loadout, relics);
        sut2.performAttack({
          weapon: yanmiaoWeapon,
          attackDefinition: yanmiaoWeapon.definition.normalAttacks[0],
        });

        expect(hasEffectEvent(sut2, yanmiaoTrait1PhysBuff.id)).toBe(false);
        expect(hasEffectEvent(sut2, yanmiaoTrait2PhysBuff.id)).toBe(true);
        expect(hasEffectEvent(sut2, yanmiaoTrait3PhysBuff.id)).toBe(false);
      });
    });
  });

  describe('weapon charge', () => {
    it('adds the amount of charge at the end of an attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.normalAttacks[0],
      });
      expect(sut.chargeTimeline.cumulatedCharge).toBe(
        weapon1.definition.normalAttacks[0].charge
      );
      expect(sut.chargeTimeline.lastEvent?.time).toBe(
        weapon1.definition.normalAttacks[0].duration
      );
    });

    it('deducts a full charge at the start of a discharge attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      repeat(() => {
        sut.performAttack({
          weapon: weapon1,
          attackDefinition: weapon1.definition.normalAttacks[0],
        });
      }, 20);
      expect(sut.chargeTimeline.cumulatedCharge).toBe(maxCharge);

      sut.performAttack({
        weapon: weapon2,
        attackDefinition: weapon2.definition.discharge,
      });
      expect(sut.chargeTimeline.cumulatedCharge).toBe(maxCharge - fullCharge);
      expect(sut.chargeTimeline.lastEvent?.time).toBe(
        sut.attackTimelines.get(weapon2)?.lastEvent?.startTime
      );
    });
  });

  describe('weapon effect', () => {
    it('is added with a duration, triggered by an attack', () => {
      const sut = new CombatSimulator(combatDuration, loadout, relics);
      sut.performAttack({
        weapon: weapon1,
        attackDefinition: weapon1.definition.skills[0],
      });

      const effectEvent = sut.effectPool.getEffect(
        'brevey-effect-pact-amplification'
      )?.timeline.lastEvent;
      expect(effectEvent).toBeDefined();
      if (effectEvent) {
        expect(effectEvent.startTime).toBe(
          sut.attackTimelines.get(weapon1)?.lastEvent?.startTime
        );
        expect(effectEvent.duration).toBe(30000);
      }
    });
  });
});

function hasEffectEvent(combatSimulator: CombatSimulator, effectId: string) {
  return !!combatSimulator.effectPool.getEffect(effectId)?.timeline.lastEvent;
}
