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
import type { Ability } from '../ability/ability';
import { AbilityRequirements } from '../ability/ability-requirements';
import { AbilityTrigger } from '../ability/ability-trigger';
import { AttackAbility } from '../attack/attack-ability';
import { AttackTimeline } from '../attack/attack-timeline';
import { ActiveBuffCollection } from '../buff/active-buff-collection';
import { AttackBuff } from '../buff/attack-buff';
import { BaseAttackBuff } from '../buff/base-attack-buff';
import { BuffAbility } from '../buff/buff-ability';
import type { BuffSource } from '../buff/buff-source';
import { BuffTimeline } from '../buff/buff-timeline';
import { CritDamageBuff } from '../buff/crit-damage-buff';
import { CritRateBuff } from '../buff/crit-rate-buff';
import { ElementalDamageBuff } from '../buff/elemental-damage-buff';
import { FinalDamageBuff } from '../buff/final-damage-buff';
import { UtilizedBuffs } from '../buff/utilized-buffs';
import type { Character } from '../character/character';
import { Charge } from '../charge/charge';
import type { CombatState } from '../combat-state/combat-state';
import { CurrentCombatState } from '../combat-state/current-combat-state';
import { DamageRecord } from '../damage-record/damage-record';
import { DamageRecordTimeline } from '../damage-record/damage-record-timeline';
import type { EventManager } from '../event/event-manager';
import type { EventSubscriber } from '../event/event-subscriber';
import { Registry } from '../registry/registry';
import type { Relics } from '../relics/relics';
import { Resource } from '../resource/resource';
import type { ResourceDefinition } from '../resource/resource-definition';
import { ResourceRequirements } from '../resource/resource-requirements';
import { ResourceTimeline } from '../resource-timeline/resource-timeline';
import type { Target } from '../target/target';
import { ElementalWeaponRequirements } from '../team/elemental-weapon-requirements';
import { TeamRequirements } from '../team/team-requirements';
import { WeaponResonanceRequirements } from '../team/weapon-resonance-requirements';
import { CurrentTick } from '../tick/current-tick';
import { TimeInterval } from '../time-interval/time-interval';
import { ActiveWeaponRequirements } from '../weapon/active-weapon-requirements';
import { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import { WeaponTrackerTimeline } from '../weapon-tracker/weapon-tracker-timeline';

export class CombatControl {
  private readonly currentTick: CurrentTick;
  private readonly currentCombatState: CurrentCombatState;
  private readonly weaponTracker: WeaponTracker;
  private readonly damageRecord: DamageRecord;
  private readonly team: Team;
  private readonly charge: Charge;
  private readonly resources: Registry<Resource>;
  private readonly attacks: Registry<AttackAbility>;
  private readonly buffs: Registry<BuffAbility>;
  private readonly abilities: Registry<Ability>;
  private readonly eventSubscribers: EventSubscriber[] = [];

  public constructor(
    combatDuration: number,
    loadout: Loadout,
    userStats: UserStats,
    relics: Relics,
    private readonly character: Character,
    private readonly eventManager: EventManager,
    private readonly target: Target
  ) {
    const { team, simulacrumTrait } = loadout;
    this.team = team;
    const { weapons } = this.team;

    const startingTickInterval = new TimeInterval(-tickDuration, 0);
    this.currentTick = new CurrentTick(
      startingTickInterval.startTime,
      tickDuration
    );
    this.weaponTracker = new WeaponTracker(
      new WeaponTrackerTimeline(combatDuration),
      this.eventManager,
      this.currentTick
    );

    this.currentCombatState = new CurrentCombatState(
      character,
      team,
      this.weaponTracker,
      target,
      [],
      undefined,
      this.getActiveBuffs()
    );

    const createResource = (definition: ResourceDefinition): Resource =>
      new Resource(
        definition.id,
        definition.displayName,
        definition.maxAmount,
        definition.startingAmount ?? 0,
        definition.regenerate ?? {},
        new ResourceTimeline(combatDuration),
        eventManager,
        this.currentTick
      );
    this.charge = new Charge(
      chargeDefinition.id,
      chargeDefinition.displayName,
      chargeDefinition.maxAmount,
      chargeDefinition.startingAmount ?? 0,
      chargeDefinition.regenerate ?? {},
      new ResourceTimeline(combatDuration),
      eventManager,
      this.currentTick
    );
    const dodge = createResource(dodgeResourceDefinition);
    const endurance = createResource(enduranceDefinition);
    const customResources = team.weapons.flatMap((weapon) =>
      weapon.resources.map((resourceDefinition) =>
        createResource(resourceDefinition)
      )
    );
    this.resources = new Registry([
      this.charge,
      dodge,
      endurance,
      ...customResources,
    ]);

    const createRequirements = (
      definition: AbilityRequirementsDefinition
    ): AbilityRequirements =>
      new AbilityRequirements(
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
        eventManager,
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

    const attacks: AttackAbility[] = [];
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
          eventManager,
          this.currentTick,
          this.currentCombatState,
          weapon,
          definition.elementalType,
          definition.type,
          definition.isForegroundAttack,
          definition.baseDamageModifiers,
          definition.finalDamageModifiers,
          definition.hitCount,
          !!definition.doesNotTriggerEvents
        );
        attacks.push(attack);

        abilityTriggers.push(createAbilityTrigger(attack, definition));
      }
    }
    this.attacks = new Registry(attacks);

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

    const buffAbilities: BuffAbility[] = [];
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
          eventManager,
          this.currentTick,
          this.currentCombatState,
          abilityDef.maxStacks,
          baseAttackBuffs,
          attackBuffs,
          elementalDamageBuffs,
          finalDamageBuffs,
          critRateBuffs,
          critDamageBuffs
        );
        buffAbilities.push(buffAbility);

        abilityTriggers.push(createAbilityTrigger(buffAbility, abilityDef));
      }
    }
    this.buffs = new Registry(buffAbilities);

    this.abilities = new Registry([...this.attacks.items, ...this.buffs.items]);

    const utilizedBuffs = new UtilizedBuffs();
    this.damageRecord = new DamageRecord(
      new DamageRecordTimeline(combatDuration),
      utilizedBuffs,
      this.currentTick,
      this.currentCombatState,
      eventManager
    );

    this.eventSubscribers.push(
      ...this.resources.items,
      ...abilityTriggers,
      this.damageRecord
    );
  }

  private hasBegunCombat = false;
  /** The current state of the combat at the start of the current tick */
  private _currentState!: CombatState;

  public get currentState(): CombatState {
    return this._currentState;
  }

  public beginCombat() {
    this.subscribeSubscribers();
    this.addStartingResources();
    this.processTick();
    this.advanceTick();
    this.hasBegunCombat = true;
    this.eventManager.publishCombatStarted({});
  }

  public performAttack(id: AttackId) {
    if (!this.hasBegunCombat)
      throw new Error('Combat has not begun. Call beginCombat() first.');

    if (!this.getAvailableAttacks().includes(id))
      throw new Error(`Attack ${id} is not available to be performed`);

    this.eventManager.publishAbilityTriggerRequest({ id });

    // Advance tick to start the attack, then finish it
    this.processTick();
    this.advanceTick();
    this.finishOngoingForegroundAttacks();
  }

  public getAvailableAttacks(): AttackId[] {
    return this.attacks.items
      .filter((attack) => attack.canPlayerTrigger())
      .map((attack) => attack.id);
  }

  private advanceTick() {
    this.currentTick.advance();
    this.updateCurrentState();
  }

  private processTick() {
    if (this.currentTick.value.isProcessed) return;

    this.eventManager.deliverAllMessages();

    for (const ability of this.abilities.items) {
      ability.process();
    }

    for (const resource of this.resources.items) {
      resource.process();
    }

    this.currentTick.value.isProcessed = true;
  }

  /** Advance and process ticks until there are no ongoing foreground attacks */
  private finishOngoingForegroundAttacks() {
    while (
      this.attacks.items.some((attack) => attack.isOngoingForegroundAttack())
    ) {
      this.advanceTick();
      this.processTick();
    }
  }

  private updateCurrentState() {
    this.currentCombatState.update(
      this.character,
      this.team,
      this.weaponTracker,
      this.target,
      this.resources.items,
      this.charge,
      this.getActiveBuffs()
    );
  }

  private getActiveBuffs() {
    return new ActiveBuffCollection(
      this.buffs.items.flatMap(
        (buffAbility) => buffAbility.getActiveBuffs().items
      )
    );
  }

  private addStartingResources() {
    for (const resource of this.resources.items) {
      resource.addStartingAmount();
    }
  }

  private subscribeSubscribers() {
    for (const subscriber of this.eventSubscribers) {
      subscriber.subscribeToEvents();
    }
  }
}
