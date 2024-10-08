import {
  chargeDefinition,
  dodgeResourceDefinition,
  enduranceDefinition,
} from '../../../definitions/resources';
import { teamBuffs } from '../../../definitions/team-buffs';
import { tickDuration } from '../../../definitions/tick';
import type { Ability as AbilityDefinition } from '../../../definitions/types/ability/ability';
import type { AbilityRequirements as AbilityRequirementsDefinition } from '../../../definitions/types/ability/ability-requirements';
import type { AttackId } from '../../../definitions/types/attack/attack-ability';
import type { BuffAbility as BuffAbilityDefinition } from '../../../definitions/types/buff/buff-ability';
import type { Loadout } from '../../loadout';
import type { Team } from '../../team';
import type { UserStats } from '../../user-stats';
import type { Weapon } from '../../weapon';
import type { Ability } from '../ability/ability';
import { AbilityRequirements } from '../ability/ability-requirements';
import { AbilityTrigger } from '../ability/ability-trigger';
import type { AbilityTriggerOptions } from '../ability/ability-trigger-options';
import { ActiveWeapon } from '../active-weapon/active-weapon';
import { ActiveWeaponTimeline } from '../active-weapon/active-weapon-timeline';
import { AttackAbility } from '../attack/attack-ability';
import { AttackRegistry } from '../attack/attack-registry';
import { AttackTimeline } from '../attack/attack-timeline';
import { ActiveBuffs } from '../buff/active-buff/active-buffs';
import { AttackBuff } from '../buff/attack-buff/attack-buff';
import { BaseAttackBuff } from '../buff/base-attack-buff/base-attack-buff';
import { BuffAbility } from '../buff/buff-ability';
import { BuffRegistry } from '../buff/buff-registry';
import type { BuffSource } from '../buff/buff-source';
import { BuffTimeline } from '../buff/buff-timeline';
import { CritDamageBuff } from '../buff/crit-damage-buff/crit-damage-buff';
import { CritRateBuff } from '../buff/crit-rate-buff/crit-rate-buff';
import { ElementalDamageBuff } from '../buff/elemental-damage-buff/elemental-damage-buff';
import { FinalDamageBuff } from '../buff/final-damage-buff/final-damage-buff';
import { UtilizedBuffs } from '../buff/utilized-buffs';
import { CurrentCharacterStats } from '../character/current-character-stats';
import { Charge } from '../charge/charge';
import { DamageRecord } from '../damage-record/damage-record';
import { DamageRecordTimeline } from '../damage-record/damage-record-timeline';
import { EventManager } from '../event/event-manager';
import type { EventSubscriber } from '../event/event-subscriber';
import { Registry } from '../registry/registry';
import type { Relics } from '../relics/relics';
import { CurrentResources } from '../resource/current-resource/current-resources';
import { Resource } from '../resource/resource';
import type { ResourceDefinition } from '../resource/resource-definition';
import { ResourceRegistry } from '../resource/resource-registry';
import { ResourceRequirements } from '../resource/resource-requirements';
import { ResourceTimeline } from '../resource-timeline/resource-timeline';
import type { Target } from '../target/target';
import { ElementalWeaponRequirements } from '../team/elemental-weapon-requirements';
import { TeamRequirements } from '../team/team-requirements';
import { WeaponResonanceRequirements } from '../team/weapon-resonance-requirements';
import { CurrentTick } from '../tick/current-tick';
import { TimeInterval } from '../time-interval/time-interval';
import { ActiveWeaponRequirements } from '../weapon/active-weapon-requirements';
import type { CombatSimulatorOptions } from './combat-simulator-options';

export class CombatSimulator {
  private readonly eventManager: EventManager;
  private readonly target: Target;
  private readonly team: Team;
  private readonly currentTick: CurrentTick;
  private readonly activeWeapon: ActiveWeapon;

  private readonly resources: ResourceRegistry;
  private readonly currentResources: CurrentResources;

  private readonly attacks: AttackRegistry;

  private readonly buffs: BuffRegistry;
  private readonly activeBuffs: ActiveBuffs;

  private readonly currentCharacterStats: CurrentCharacterStats;
  private readonly damageRecord: DamageRecord;

  private readonly eventSubscribers: EventSubscriber[] = [];

  private hasBegunCombat = false;

  public constructor(
    loadout: Loadout,
    userStats: UserStats,
    relics: Relics,
    options: CombatSimulatorOptions
  ) {
    const { combatDuration, targetResistance } = options;

    this.eventManager = new EventManager();

    this.target = { resistance: targetResistance };

    const { team, simulacrumTrait } = loadout;
    this.team = team;
    const { weapons } = this.team;

    const startingTickInterval = new TimeInterval(-tickDuration, 0);
    this.currentTick = new CurrentTick(
      startingTickInterval.startTime,
      tickDuration,
      this.eventManager
    );
    this.activeWeapon = new ActiveWeapon(
      weapons,
      new ActiveWeaponTimeline(combatDuration),
      this.eventManager,
      this.currentTick
    );

    const createResource = (definition: ResourceDefinition): Resource =>
      new Resource(
        definition.id,
        definition.displayName,
        definition.maxAmount,
        definition.startingAmount ?? 0,
        definition.regenerate ?? {},
        new ResourceTimeline(combatDuration),
        this.eventManager,
        this.currentTick
      );
    const charge = new Charge(
      chargeDefinition.id,
      chargeDefinition.displayName,
      chargeDefinition.maxAmount,
      chargeDefinition.startingAmount ?? 0,
      chargeDefinition.regenerate ?? {},
      new ResourceTimeline(combatDuration),
      this.eventManager,
      this.currentTick
    );
    const dodge = createResource(dodgeResourceDefinition);
    const endurance = createResource(enduranceDefinition);
    const customResources = team.weapons.flatMap((weapon) =>
      weapon.resources.map((resourceDefinition) =>
        createResource(resourceDefinition)
      )
    );
    this.resources = new ResourceRegistry(charge, [
      dodge,
      endurance,
      ...customResources,
    ]);
    this.currentResources = new CurrentResources(this.resources);

    const createRequirements = (
      definition: AbilityRequirementsDefinition
    ): AbilityRequirements =>
      new AbilityRequirements(
        this.team,
        this.activeWeapon,
        this.currentResources,
        this.activeBuffs,
        definition.activeBuff,
        new ActiveWeaponRequirements(
          definition.activeWeapon?.is,
          definition.activeWeapon?.isNot
        ),
        new TeamRequirements(
          definition.teamRequirements?.anyWeapon,
          new WeaponResonanceRequirements(
            definition.teamRequirements?.weaponResonance?.is,
            definition.teamRequirements?.weaponResonance?.isNot
          ),
          new ElementalWeaponRequirements(
            definition.teamRequirements?.elementalWeapons?.numOfElementalWeapons,
            definition.teamRequirements?.elementalWeapons?.numOfNotElementalWeapons,
            definition.teamRequirements?.elementalWeapons?.numOfDifferentElementalTypes
          )
        ),
        new ResourceRequirements(definition.hasResource)
      );

    const createAbilityTrigger = (
      ability: Ability,
      definition: AbilityDefinition
    ): AbilityTrigger => {
      const { triggeredBy } = definition;
      return new AbilityTrigger(
        ability,
        this.eventManager,
        triggeredBy.combatStart,
        triggeredBy.activeWeaponChange,
        triggeredBy.abilityStart,
        triggeredBy.abilityEnd,
        triggeredBy.hitOfAnyAttack || triggeredBy.hitOfWeapon
          ? {
              any: triggeredBy.hitOfAnyAttack,
              ofWeapon: triggeredBy.hitOfWeapon,
            }
          : undefined,
        triggeredBy.resourceUpdate
      );
    };

    const abilityTriggers: AbilityTrigger[] = [];

    this.attacks = new AttackRegistry([]);
    for (const weapon of weapons) {
      for (const definition of weapon.attackDefinitions) {
        const attack = new AttackAbility(
          definition.id,
          definition.displayName,
          definition.cooldown,
          definition.duration,
          definition.canBePlayerTriggered,
          createRequirements(definition.requirements),
          definition.updatesResources ?? [],
          new AttackTimeline(combatDuration),
          this.eventManager,
          this.currentTick,
          weapon,
          definition.elementalType,
          definition.type,
          definition.isForegroundAttack,
          definition.baseDamageModifiers,
          definition.finalDamageModifiers,
          definition.hitCount,
          !!definition.doesNotTriggerEvents,
          this.activeWeapon,
          this.currentResources
        );
        this.attacks.add(attack);

        abilityTriggers.push(createAbilityTrigger(attack, definition));
      }
    }

    const buffAbilityDefinitions: {
      source: BuffSource;
      abilityDefinitions: BuffAbilityDefinition[];
    }[] = [
      {
        source: 'weapon',
        abilityDefinitions: weapons.flatMap((weapon) => weapon.buffs),
      },
      {
        source: 'matrix',
        abilityDefinitions: weapons.flatMap((weapon) =>
          weapon.matrixSets
            .getMatrixSets()
            .flatMap((matrixSet) => matrixSet.buffs)
        ),
      },
      { source: 'team', abilityDefinitions: teamBuffs },
      { source: 'simulacra', abilityDefinitions: simulacrumTrait?.buffs ?? [] },
      { source: 'relic', abilityDefinitions: relics.passiveRelicBuffs },
    ];

    this.buffs = new BuffRegistry([]);
    for (const { source, abilityDefinitions } of buffAbilityDefinitions) {
      for (const abilityDef of abilityDefinitions) {
        const { id } = abilityDef;

        const baseAttackBuffs =
          abilityDef.baseAttackBuffs?.flatMap((baseAttackBuffDef) =>
            baseAttackBuffDef.elementalTypes.map(
              (elementalType) =>
                new BaseAttackBuff(id, baseAttackBuffDef.value, elementalType)
            )
          ) ?? [];

        const attackBuffs =
          abilityDef.attackBuffs?.flatMap((attackBuffDef) =>
            attackBuffDef.elementalTypes.map(
              (elementalType) =>
                new AttackBuff(id, attackBuffDef.value, elementalType)
            )
          ) ?? [];

        const elementalDamageBuffs =
          abilityDef.elementalDamageBuffs?.flatMap((elementalDamageBuffDef) =>
            elementalDamageBuffDef.elementalTypes.map(
              (elementalType) =>
                new ElementalDamageBuff(
                  id,
                  elementalDamageBuffDef.value,
                  source,
                  elementalDamageBuffDef.restrictedTo ?? {},
                  elementalType
                )
            )
          ) ?? [];

        const finalDamageBuffs =
          abilityDef.finalDamageBuffs?.map(
            (finalDamageBuffDef) =>
              new FinalDamageBuff(
                id,
                finalDamageBuffDef.value,
                source,
                finalDamageBuffDef.restrictedTo ?? {}
              )
          ) ?? [];

        const critRateBuffs =
          abilityDef.critRateBuffs?.map(
            (critRateBuffDef) => new CritRateBuff(id, critRateBuffDef.value)
          ) ?? [];

        const critDamageBuffs =
          abilityDef.critDamageBuffs?.map(
            (critDamageBuffDef) =>
              new CritDamageBuff(id, critDamageBuffDef.value)
          ) ?? [];

        const buffAbility = new BuffAbility(
          id,
          abilityDef.displayName,
          abilityDef.cooldown,
          abilityDef.duration,
          abilityDef.canBePlayerTriggered,
          createRequirements(abilityDef.requirements),
          abilityDef.updatesResources ?? [],
          new BuffTimeline(combatDuration),
          this.eventManager,
          this.currentTick,
          abilityDef.maxStacks,
          baseAttackBuffs,
          attackBuffs,
          elementalDamageBuffs,
          finalDamageBuffs,
          critRateBuffs,
          critDamageBuffs
        );
        this.buffs.add(buffAbility);

        abilityTriggers.push(createAbilityTrigger(buffAbility, abilityDef));
      }
    }

    this.activeBuffs = new ActiveBuffs(this.buffs);

    this.currentCharacterStats = new CurrentCharacterStats(
      userStats,
      loadout,
      loadout.loadoutStats,
      this.activeBuffs
    );

    const utilizedBuffs = new UtilizedBuffs();
    this.damageRecord = new DamageRecord(
      new DamageRecordTimeline(combatDuration),
      utilizedBuffs,
      this.currentTick,
      this.eventManager,
      this.target,
      this.activeBuffs,
      this.currentCharacterStats
    );

    this.eventSubscribers.push(
      ...this.resources.items,
      ...this.attacks.items,
      ...this.buffs.items,
      ...abilityTriggers,
      this.damageRecord
    );
  }

  public beginCombat() {
    this.subscribeEventSubscribers();
    this.addStartingResources();
    this.advanceTick();
    this.hasBegunCombat = true;
    this.eventManager.publishCombatStarted({});
  }

  public performAttack(id: AttackId, options?: AbilityTriggerOptions) {
    if (!this.hasBegunCombat)
      throw new Error('Combat has not begun. Call beginCombat() first.');

    if (!this.getAvailableAttacks().includes(id))
      throw new Error(`Attack ${id} is not available to be performed`);

    this.eventManager.publishAbilityTriggerRequest({ id, options });

    // Advance tick to start the attack, then finish it
    this.advanceTick();
    this.finishOngoingForegroundAttacks();
  }

  public getAvailableAttacks(): AttackId[] {
    return this.attacks.items
      .filter((attack) => attack.canPlayerTrigger())
      .map((attack) => attack.id);
  }

  public switchToWeapon(weapon: Weapon) {
    this.activeWeapon.switchTo(weapon);
  }

  public getWeaponsToSwitchTo() {
    return this.activeWeapon.getWeaponsToSwitchTo();
  }

  /** Advance and process ticks until there are no ongoing foreground attacks */
  private finishOngoingForegroundAttacks() {
    while (this.attacks.hasOngoingForegroundAttack()) {
      this.advanceTick();
    }
  }

  private advanceTick() {
    this.currentTick.advance();
  }

  private addStartingResources() {
    for (const resource of this.resources.items) {
      resource.addStartingAmount();
    }
  }

  private subscribeEventSubscribers() {
    for (const subscriber of this.eventSubscribers) {
      subscriber.subscribeToEvents();
    }
  }

  private get abilities(): Registry<Ability> {
    return new Registry([...this.attacks.items, ...this.buffs.items]);
  }
  // /** Similar to `toDto()`, but cleaned up and aggregated for display purposes. The intention is for the output of this to be for display purposes only and not able to be deserialized with all the correct states later. e.g. Abilities with empty timelines removed, Player input attacks are combined into one, for each weapon */
  // public snapshot(): CombatSimulatorSnapshot {
  //   const playerInputAttackTimelines = [];

  //   const weaponAttacksMap = new Map<Weapon, WeaponAttackSnapshot>();
  //   // Combine all player input attack timelines into one, for each weapon
  //   for (const { displayName, weapon, timeline } of this.attackRegistry
  //     .activeAttacks) {
  //     if (!weaponAttacksMap.has(weapon)) {
  //       weaponAttacksMap.set(weapon, {
  //         weaponId: weapon.id,
  //         weaponDisplayName: weapon.displayName,
  //         attackTimeline: {
  //           events: [],
  //         },
  //       });
  //     }

  //     const weaponTimeline = weaponAttacksMap.get(weapon)?.attackTimeline;
  //     if (!weaponTimeline) {
  //       continue;
  //     }

  //     for (const attackEvent of timeline.events) {
  //       weaponTimeline.events.push({
  //         attackDisplayName: displayName,
  //         startTime: attackEvent.startTime,
  //         endTime: attackEvent.endTime,
  //       });
  //     }
  //   }
  //   // Sort timeline events chronologically for each weapon and push to result
  //   for (const [, { attackTimeline: timeline }] of weaponAttacksMap) {
  //     timeline.events.sort((a, b) => a.startTime - b.startTime);
  //     playerInputAttackTimelines.push(timeline);
  //   }

  //   const { loadout, passiveAttacks, buffs, resources, combatDamageSummary } =
  //     this.toDto();

  //   return {
  //     loadout,
  //     weaponAttacks: [...weaponAttacksMap.values()],
  //     passiveAttacks: passiveAttacks.filter(
  //       (attack) => attack.timeline.events.length
  //     ),
  //     buffs: buffs.filter((buff) => this.utilizedBuffs.has(buff.id)),
  //     resources: resources.filter(
  //       (resource) => resource.timeline.events.length
  //     ),
  //     damageSummary: combatDamageSummary.cumulatedDamageSummary,
  //   };
  // }

  // /** Raw serialized DTO of all properties. */
  // public toDto(): CombatSimulatorDto {
  //   const {
  //     loadout,
  //     attackRegistry,
  //     buffRegistry,
  //     resourceRegistry,
  //     combatDamageSummary,
  //   } = this;

  //   const { activeAttacks, passiveAttacks } = attackRegistry.toDto();

  //   return {
  //     loadout: loadout.toDto(),
  //     activeAttacks,
  //     passiveAttacks,
  //     buffs: buffRegistry.toDto().items,
  //     resources: resourceRegistry.toDto().resources,
  //     combatDamageSummary: combatDamageSummary.toDto(),
  //     version: 1,
  //   };
  // }
}
