import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { commonWeaponAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { Attack } from './attack';
import type { EffectDefinition } from './effect-definition';
import type { Relics } from './relics';
import { AttackEvent } from './timeline/attack-event';
import { AttackTimeline } from './timeline/attack-timeline';
import { ChargeTimeline } from './timeline/charge-timeline';
import { EffectEvent } from './timeline/effect-event';
import { EffectTimeline } from './timeline/effect-timeline';

export class CombatSimulator {
  public readonly attackTimelines = new Map<Weapon, AttackTimeline>();

  public readonly weaponAttackBuffTimelines = new Map<string, EffectTimeline>();
  public readonly weaponDamageBuffTimelines = new Map<string, EffectTimeline>();
  public readonly relicDamageBuffTimelines = new Map<string, EffectTimeline>();
  public readonly traitAttackBuffTimelines = new Map<string, EffectTimeline>();
  public readonly traitDamageBuffTimelines = new Map<string, EffectTimeline>();
  public readonly traitMiscBuffTimelines = new Map<string, EffectTimeline>();

  public readonly chargeTimeline = new ChargeTimeline();
  public readonly weaponEffectsTimelines = new Map<string, EffectTimeline>();

  private _activeWeapon: Weapon | undefined;
  /** The previous weapon before switching to the current active weapon */
  private _previousWeapon: Weapon | undefined;

  /** Registered effect definitions will be checked whenever an attack happens. An effect event will be added to the specified timeline if the conditions defined in the effect definition are met */
  private registeredEffects: {
    effectDefinitions: EffectDefinition[];
    timelineGroupToAddTo: Map<string, EffectTimeline>;
  }[] = [];

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelines.set(weapon, new AttackTimeline());
    });

    this.registerEffects();
  }

  public get activeWeapon(): Weapon | undefined {
    return this._activeWeapon;
  }

  public get availableAttacks(): Pick<Attack, 'weapon' | 'attackDefinition'>[] {
    const allAttacks = this.loadout.team.weapons.flatMap((weapon) => {
      const {
        definition: { normalAttacks, dodgeAttacks, skills, discharge },
      } = weapon;

      return [...normalAttacks, ...dodgeAttacks, ...skills, discharge].map(
        (attackDefinition) => ({
          weapon,
          attackDefinition,
        })
      );
    });

    return allAttacks.filter((attack) => {
      const {
        attackDefinition: { cooldown },
      } = attack;
      const { nextEarliestAttackStartTime } = this;

      // Discharge attacks require full charge and cannot be from the active weapon
      if (attack.attackDefinition.type === 'discharge') {
        return (
          this.chargeTimeline.hasFullCharge &&
          attack.weapon !== this.activeWeapon
        );
      }

      // Check to see if this attack has been performed in the timeline in the cooldown range
      const attackEventsToCheck =
        this.attackTimelines
          .get(attack.weapon)
          ?.getEventsBetween(
            nextEarliestAttackStartTime - cooldown,
            nextEarliestAttackStartTime
          ) ?? [];
      return attackEventsToCheck.every(
        (x) =>
          x.attackDefinition.id !== attack.attackDefinition.id ||
          x.cooldownEndsAt <= nextEarliestAttackStartTime
      );
    });
  }

  public get nextEarliestAttackStartTime(): number {
    return this.activeWeapon
      ? this.attackTimelines.get(this.activeWeapon)?.nextEarliestStartTime ?? 0
      : 0;
  }

  public performAttack({
    weapon,
    attackDefinition,
  }: Pick<Attack, 'weapon' | 'attackDefinition'>) {
    if (
      !this.availableAttacks.find(
        (availableAttack) =>
          availableAttack.weapon === weapon &&
          availableAttack.attackDefinition.id === attackDefinition.id
      )
    ) {
      throw new Error('Attack not available to be performed');
    }

    const { nextEarliestAttackStartTime } = this;
    const attackTimeline = this.attackTimelines.get(weapon);

    if (!attackTimeline) {
      throw new Error('Weapon attack timeline not set up');
    }

    if (this._activeWeapon !== weapon) {
      this._previousWeapon = this._activeWeapon;
      this._activeWeapon = weapon;
    }

    const attackEvent = new AttackEvent(
      nextEarliestAttackStartTime,
      weapon,
      attackDefinition
    );

    if (
      attackDefinition.followLastWeaponElementalType &&
      this._previousWeapon
    ) {
      attackEvent.elementalType = this._previousWeapon.definition.damageElement;
    }

    attackTimeline.addEvent(attackEvent);

    // Register all events first at the start of combat
    if (attackEvent.startTime === 0) {
      this.registerEffects();
    }

    this.adjustCharge(attackEvent);

    this.triggerRegisteredEffectsIfApplicable(attackEvent);
  }

  private adjustCharge(attackEvent: AttackEvent) {
    if (attackEvent.attackDefinition.type === 'discharge') {
      this.chargeTimeline.deductOneFullCharge(attackEvent.startTime);
    } else {
      this.chargeTimeline.addCharge(
        attackEvent.attackDefinition.charge,
        attackEvent.endTime
      );
    }
  }

  private triggerRegisteredEffectsIfApplicable(attackEvent: AttackEvent) {
    this.registeredEffects.forEach(
      ({ effectDefinitions, timelineGroupToAddTo }) => {
        effectDefinitions.forEach((effectDefinition) => {
          this.addEffectIfApplicable(
            effectDefinition,
            timelineGroupToAddTo,
            attackEvent
          );
        });
      }
    );
  }

  private registerEffects() {
    const {
      loadout: {
        team: { weapons },
        simulacrumTrait,
      },
      relics,
    } = this;

    // NOTE: Add these in least likely to be depended on from another effect to most likely. This pretty much means order these in most broad to most specific buffs. This is to avoid an effect that is supposed to depend on another to be triggered at the exact same time. This can be improved upon in the future (perhaps add "ticks"?) but it'll do for now (right now a "tick" = when a new attack occurs)
    this.registeredEffects = [
      {
        effectDefinitions: relics.passiveRelicBuffs,
        timelineGroupToAddTo: this.relicDamageBuffTimelines,
      },
      {
        effectDefinitions: simulacrumTrait?.attackBuffs ?? [],
        timelineGroupToAddTo: this.traitAttackBuffTimelines,
      },
      {
        effectDefinitions: simulacrumTrait?.damageBuffs ?? [],
        timelineGroupToAddTo: this.traitDamageBuffTimelines,
      },
      {
        effectDefinitions: simulacrumTrait?.miscellaneousBuffs ?? [],
        timelineGroupToAddTo: this.traitMiscBuffTimelines,
      },
      {
        effectDefinitions: weapons.flatMap((weapon) =>
          weapon.definition.commonAttackBuffs.map(
            (buffId) => commonWeaponAttackBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponAttackBuffTimelines,
      },
      {
        effectDefinitions: weapons.flatMap((weapon) =>
          weapon.definition.commonDamageBuffs.map(
            (buffId) => commonWeaponDamageBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponDamageBuffTimelines,
      },
      {
        effectDefinitions: weapons.flatMap(
          (weapon) => weapon.definition.attackBuffs
        ),
        timelineGroupToAddTo: this.weaponAttackBuffTimelines,
      },
      {
        effectDefinitions: weapons.flatMap(
          (weapon) => weapon.definition.damageBuffs
        ),
        timelineGroupToAddTo: this.weaponDamageBuffTimelines,
      },
      {
        effectDefinitions: weapons.flatMap(
          (weapon) => weapon.definition.effects
        ),
        timelineGroupToAddTo: this.weaponEffectsTimelines,
      },
    ];
  }

  private addEffectIfApplicable(
    effectDefinition: EffectDefinition,
    timelineGroup: Map<string, EffectTimeline>,
    attackEvent: AttackEvent
  ) {
    if (!this.hasEffectMetRequirements(effectDefinition, attackEvent.startTime))
      return;
    if (!this.shouldTriggerEffect(effectDefinition, attackEvent)) return;

    const effectTimePeriod = this.determineEffectTimePeriod(
      effectDefinition,
      attackEvent
    );
    if (!effectTimePeriod) return;

    const { id, maxStacks } = effectDefinition;

    if (!timelineGroup.has(id)) {
      timelineGroup.set(id, new EffectTimeline());
    }

    timelineGroup
      .get(id)
      ?.addEvent(
        new EffectEvent(
          effectTimePeriod.startTime,
          effectTimePeriod.duration,
          effectDefinition,
          maxStacks
        )
      );
  }

  private hasEffectMetRequirements(
    effect: EffectDefinition,
    time: number
  ): boolean {
    const { requirements } = effect;
    if (!requirements) return true;

    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.loadout.team;

    // Check requirements from most specific to least specific for efficiency

    if (
      requirements.activeEffect &&
      !this.isEffectActive(requirements.activeEffect, time)
    )
      return false;

    if (
      requirements.weaponInTeam &&
      !weaponNames.includes(requirements.weaponInTeam)
    )
      return false;

    if (
      requirements.weaponResonance &&
      weaponResonance !== requirements.weaponResonance
    )
      return false;

    const elementalTypeWeaponRequirement =
      requirements.elementalTypeWeaponsInTeam;
    if (elementalTypeWeaponRequirement) {
      const numOfWeaponsOfElementalType = weaponElementalTypes.filter(
        (x) => x === elementalTypeWeaponRequirement.elementalType
      ).length;

      if (
        numOfWeaponsOfElementalType !==
        elementalTypeWeaponRequirement.numOfWeapons
      )
        return false;
    }

    const notElementalTypeWeaponRequirement =
      requirements.notElementalTypeWeaponsInTeam;
    if (notElementalTypeWeaponRequirement) {
      const numOfNotElementalTypeWeapons = weapons.filter(
        (weapon) =>
          !weapon.definition.resonanceElements.includes(
            notElementalTypeWeaponRequirement.notElementalType
          )
      ).length;

      if (
        numOfNotElementalTypeWeapons !==
        notElementalTypeWeaponRequirement.numOfWeapons
      )
        return false;
    }

    if (requirements.numOfDifferentElementalTypesInTeam) {
      const numOfDifferentElementalTypes = Object.keys(
        groupBy(weaponElementalTypes)
      ).length;

      if (
        numOfDifferentElementalTypes !==
        requirements.numOfDifferentElementalTypesInTeam
      )
        return false;
    }

    return true;
  }

  private shouldTriggerEffect(
    effectDefinition: EffectDefinition,
    attackEvent: AttackEvent
  ): boolean {
    const { triggeredBy } = effectDefinition;

    const {
      attackDefinition: { id: attackId, type: attackType },
      weapon: {
        definition: {
          id: weaponId,
          type: weaponType,
          resonanceElements: weaponElementalTypes,
        },
      },
    } = attackEvent;

    // Check triggers from least specific to most specific for efficiency

    if (triggeredBy.combatStart && attackEvent.startTime === 0) return true;

    if (triggeredBy.skillOfAnyWeapon && attackType === 'skill') return true;

    if (triggeredBy.dischargeOfAnyWeapon && attackType === 'discharge')
      return true;

    if (
      triggeredBy.skillOfWeaponType &&
      attackType === 'skill' &&
      weaponType === triggeredBy.skillOfWeaponType
    )
      return true;

    if (
      triggeredBy.dischargeOfWeaponType &&
      attackType === 'discharge' &&
      weaponType === triggeredBy.dischargeOfWeaponType
    )
      return true;

    // TODO: need to check if dual element weapons trigger this
    if (
      triggeredBy.skillOfElementalType &&
      attackType === 'skill' &&
      weaponElementalTypes.includes(triggeredBy.skillOfElementalType)
    )
      return true;

    // TODO: need to check if dual element weapons trigger this
    if (
      triggeredBy.dischargeOfElementalType &&
      attackType === 'discharge' &&
      weaponElementalTypes.includes(triggeredBy.dischargeOfElementalType)
    )
      return true;

    if (triggeredBy.notActiveWeapon && weaponId !== triggeredBy.notActiveWeapon)
      return true;

    if (triggeredBy.activeWeapon && weaponId === triggeredBy.activeWeapon)
      return true;

    if (
      triggeredBy.weaponAttacks &&
      triggeredBy.weaponAttacks.includes(attackId)
    )
      return true;

    return false;
  }

  private determineEffectTimePeriod(
    effect: EffectDefinition,
    attackEvent: AttackEvent
  ): { startTime: number; duration: number } | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = effect;

    if (value) {
      return { startTime: attackEvent.startTime, duration: value };
    }
    if (followActiveWeapon) {
      return {
        startTime: attackEvent.startTime,
        duration: attackEvent.duration,
      };
    }
    if (applyToEndSegmentOfCombat) {
      const duration = BigNumber(this.combatDuration)
        .times(applyToEndSegmentOfCombat)
        .toNumber();
      const startTime = BigNumber(this.combatDuration)
        .minus(duration)
        .toNumber();

      return { startTime, duration };
    }
    if (untilCombatEnd) {
      return {
        startTime: attackEvent.startTime,
        duration: BigNumber(this.combatDuration)
          .minus(attackEvent.startTime)
          .toNumber(),
      };
    }

    return undefined;
  }

  /** Check if an effect at the given time by checking through the registered effects */
  private isEffectActive(effectId: string, time: number) {
    // Assume there will only be one timeline holding the effect, not multiple
    for (const { timelineGroupToAddTo } of this.registeredEffects) {
      const eventTimeline = timelineGroupToAddTo.get(effectId);
      if (eventTimeline) {
        return eventTimeline.getEventsOverlapping(time, time).length !== 0;
      }
    }

    return false;
  }
}
