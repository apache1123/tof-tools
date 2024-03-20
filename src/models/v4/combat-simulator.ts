import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { commonWeaponAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { Attack } from './attack';
import type { BuffDefinition } from './buffs/buff-definition';
import type { Relics } from './relics';
import { AttackEvent } from './timeline/attack-event';
import { AttackTimeline } from './timeline/attack-timeline';
import { BuffEvent } from './timeline/buff-event';
import { BuffTimeline } from './timeline/buff-timeline';
import { ChargeTimeline } from './timeline/charge-timeline';

export class CombatSimulator {
  public readonly attackTimelines = new Map<Weapon, AttackTimeline>();

  public readonly weaponAttackBuffTimelines = new Map<string, BuffTimeline>();
  public readonly weaponDamageBuffTimelines = new Map<string, BuffTimeline>();
  public readonly relicDamageBuffTimelines = new Map<string, BuffTimeline>();
  public readonly traitAttackBuffTimelines = new Map<string, BuffTimeline>();
  public readonly traitDamageBuffTimelines = new Map<string, BuffTimeline>();
  public readonly traitMiscBuffTimelines = new Map<string, BuffTimeline>();

  public readonly chargeTimeline = new ChargeTimeline();

  private _activeWeapon: Weapon | undefined;
  /** The previous weapon before switching to the current active weapon */
  private _previousWeapon: Weapon | undefined;

  /** Registered buff definitions will be checked whenever an attack happens. A buff event will be added to the timeline if the conditions defined in the buff definition are met */
  private registeredBuffs: {
    buffDefinitions: BuffDefinition[];
    timelineGroupToAddTo: Map<string, BuffTimeline>;
  }[] = [];

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelines.set(weapon, new AttackTimeline());
    });

    this.registerBuffs();
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
        (x) => x.attackDefinition.id !== attack.attackDefinition.id
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

    // Register all buffs first at the start of combat
    if (attackEvent.startTime === 0) {
      this.registerBuffs();
    }

    this.adjustCharge(attackEvent);
    this.triggerRegisteredBuffsIfApplicable(attackEvent);
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

  private triggerRegisteredBuffsIfApplicable(attackEvent: AttackEvent) {
    this.registeredBuffs.forEach(
      ({ buffDefinitions, timelineGroupToAddTo }) => {
        buffDefinitions.forEach((buffDefinition) => {
          this.addBuffIfApplicable(
            buffDefinition,
            timelineGroupToAddTo,
            attackEvent
          );
        });
      }
    );
  }

  private registerBuffs() {
    const {
      loadout: {
        team: { weapons },
        simulacrumTrait,
      },
      relics,
    } = this;
    this.registeredBuffs = [
      {
        buffDefinitions: weapons.flatMap((weapon) =>
          weapon.definition.commonAttackBuffs.map(
            (buffId) => commonWeaponAttackBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponAttackBuffTimelines,
      },
      {
        buffDefinitions: weapons.flatMap((weapon) =>
          weapon.definition.commonDamageBuffs.map(
            (buffId) => commonWeaponDamageBuffs[buffId]
          )
        ),
        timelineGroupToAddTo: this.weaponDamageBuffTimelines,
      },
      {
        buffDefinitions: weapons.flatMap(
          (weapon) => weapon.definition.attackBuffs
        ),
        timelineGroupToAddTo: this.weaponAttackBuffTimelines,
      },
      {
        buffDefinitions: relics.passiveRelicBuffs,
        timelineGroupToAddTo: this.relicDamageBuffTimelines,
      },
      {
        buffDefinitions: simulacrumTrait?.attackBuffs ?? [],
        timelineGroupToAddTo: this.traitAttackBuffTimelines,
      },
      {
        buffDefinitions: simulacrumTrait?.damageBuffs ?? [],
        timelineGroupToAddTo: this.traitDamageBuffTimelines,
      },
      {
        buffDefinitions: simulacrumTrait?.miscellaneousBuffs ?? [],
        timelineGroupToAddTo: this.traitMiscBuffTimelines,
      },
    ];
  }

  private addBuffIfApplicable(
    buffDefinition: BuffDefinition,
    timelineGroup: Map<string, BuffTimeline>,
    attackEvent: AttackEvent
  ) {
    if (!this.hasBuffMetRequirements(buffDefinition)) return;
    if (!this.shouldTriggerBuff(buffDefinition, attackEvent)) return;

    const buffTimePeriod = this.determineBuffTimePeriod(
      buffDefinition,
      attackEvent
    );
    if (!buffTimePeriod) return;

    const { id, maxStacks } = buffDefinition;

    if (!timelineGroup.has(id)) {
      timelineGroup.set(id, new BuffTimeline());
    }

    timelineGroup
      .get(id)
      ?.addEvent(
        new BuffEvent(
          buffTimePeriod.startTime,
          buffTimePeriod.duration,
          buffDefinition,
          maxStacks
        )
      );
  }

  private hasBuffMetRequirements(buff: BuffDefinition): boolean {
    const { requirements } = buff;
    if (!requirements) return true;

    const { weapons, weaponNames, weaponResonance, weaponElementalTypes } =
      this.loadout.team;

    // Check requirements from most specific to least specific for efficiency

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

  private shouldTriggerBuff(
    buffDefinition: BuffDefinition,
    attackEvent: AttackEvent
  ): boolean {
    // TODO: cooldown
    const { triggeredBy } = buffDefinition;

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

    if (triggeredBy.activeWeapon && weaponId === triggeredBy.activeWeapon)
      return true;

    if (
      triggeredBy.weaponAttacks &&
      triggeredBy.weaponAttacks.includes(attackId)
    )
      return true;

    return false;
  }

  private determineBuffTimePeriod(
    buff: BuffDefinition,
    attackEvent: AttackEvent
  ): { startTime: number; duration: number } | undefined {
    const {
      duration: {
        value,
        followActiveWeapon,
        applyToEndSegmentOfCombat,
        untilCombatEnd,
      },
    } = buff;

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
}
