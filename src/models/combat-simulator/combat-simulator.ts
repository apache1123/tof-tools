import {
  chargeDefinition,
  dodgeResourceDefinition,
  enduranceDefinition,
} from "../../definitions/resources";
import { teamBuffs } from "../../definitions/team-buffs";
import { tickDuration } from "../../definitions/tick";
import type { AbilityDefinition } from "../../definitions/types/ability/ability-definition";
import type { AbilityRequirementsDefinition } from "../../definitions/types/ability/ability-requirements-definition";
import type {
  AttackAbilityDefinition,
  AttackId,
} from "../../definitions/types/attack/attack-ability-definition";
import type { BuffAbilityDefinition as BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability-definition";
import type { Ability } from "../ability/ability";
import { AbilityRequirements } from "../ability/ability-requirements";
import { AbilityTrigger } from "../ability/ability-trigger";
import type { AbilityTriggerOptions } from "../ability/ability-trigger-options";
import { ActiveWeapon } from "../active-weapon/active-weapon";
import { ActiveWeaponTimeline } from "../active-weapon/active-weapon-timeline";
import { AttackAbilities } from "../attack/attack-abilities";
import { AttackAbility } from "../attack/attack-ability";
import { AttackTimeline } from "../attack/attack-timeline";
import type { BaseAttacks } from "../base-attacks";
import { ActiveBuffs } from "../buff/active-buff/active-buffs";
import { AttackPercentBuff } from "../buff/attack-percent-buff/attack-percent-buff";
import { BaseAttackBuff } from "../buff/base-attack-buff/base-attack-buff";
import { BuffAbilities } from "../buff/buff-abilities";
import { BuffAbility } from "../buff/buff-ability";
import type { BuffSource } from "../buff/buff-source";
import { BuffTimeline } from "../buff/buff-timeline";
import { CritDamageBuff } from "../buff/crit-damage-buff/crit-damage-buff";
import { CritRateBuff } from "../buff/crit-rate-buff/crit-rate-buff";
import { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import { FinalDamageBuff } from "../buff/final-damage-buff/final-damage-buff";
import { Character } from "../character/character";
import type { CharacterData } from "../character/character-data";
import { Charge } from "../charge/charge";
import { DamageRecord } from "../damage-record/damage-record";
import { DamageRecordTimeline } from "../damage-record/damage-record-timeline";
import { EventManager } from "../event/event-manager";
import type { GearSet } from "../gear/gear-set";
import { Registry } from "../registry/registry";
import { CurrentResources } from "../resource/current-resource/current-resources";
import { Resource } from "../resource/resource";
import type { ResourceDefinition } from "../resource/resource-definition";
import { ResourceRequirements } from "../resource/resource-requirements";
import { Resources } from "../resource/resources";
import { ResourceTimeline } from "../resource-timeline/resource-timeline";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Target } from "../target/target";
import { ElementalWeaponRequirements } from "../team/elemental-weapon-requirements";
import type { Team } from "../team/team";
import { TeamRequirements } from "../team/team-requirements";
import { WeaponResonanceRequirements } from "../team/weapon-resonance-requirements";
import { CurrentTick } from "../tick/current-tick";
import { TimeInterval } from "../time-interval/time-interval";
import { ActiveWeaponRequirements } from "../weapon/active-weapon-requirements";
import type { Weapon } from "../weapon/weapon";
import type { CombatSimulatorOptions } from "./combat-simulator-options";

export class CombatSimulator {
  public constructor(
    characterData: CharacterData,
    team: Team,
    gearSet: GearSet,
    overrideBaseAttacks: BaseAttacks,
    overrideCritRateFlat: number,
    simulacrumTrait: SimulacrumTrait | undefined,
    // relics: Relics,
    options: CombatSimulatorOptions,
  ) {
    const { combatDuration, targetResistance } = options;

    this.combatDuration = combatDuration;
    this.target = { resistance: targetResistance };
    this.team = team;
    this.simulacrumTrait = simulacrumTrait;

    this.eventManager = new EventManager();

    const startingTickInterval = new TimeInterval(0, tickDuration);
    this.currentTick = new CurrentTick(
      startingTickInterval.startTime,
      tickDuration,
      this.eventManager,
    );

    this.activeWeapon = new ActiveWeapon(
      this.team.getEquippedWeapons(),
      new ActiveWeaponTimeline(combatDuration),
      this.eventManager,
      this.currentTick,
    );

    const { charge, dodge, endurance } = this.createFixedResources();
    this.resources = new Resources(charge, dodge, endurance);
    this.currentResources = new CurrentResources(this.resources);

    this.abilityTriggers = new Registry();
    this.attackAbilities = new AttackAbilities();
    this.buffAbilities = new BuffAbilities();
    this.activeBuffs = new ActiveBuffs(this.buffAbilities);

    this.character = new Character(
      characterData,
      team,
      gearSet,
      simulacrumTrait,
      this.activeBuffs,
      this.activeWeapon,
    );
    this.character.useOverrideStats = true;
    this.character.overrideBaseAttacks = overrideBaseAttacks;
    this.character.overrideCritRateFlat = overrideCritRateFlat;

    this.damageRecord = new DamageRecord(
      new DamageRecordTimeline(combatDuration),
      this.currentTick,
      this.eventManager,
      this.character,
      this.target,
      this.buffAbilities,
      this.activeBuffs,
    );
  }

  private readonly combatDuration: number;
  private readonly target: Target;
  private readonly team: Team;
  private readonly simulacrumTrait: SimulacrumTrait | undefined;
  private readonly eventManager: EventManager;
  private readonly currentTick: CurrentTick;
  private readonly activeWeapon: ActiveWeapon;
  private readonly resources: Resources;
  private readonly currentResources: CurrentResources;
  private readonly abilityTriggers: Registry<AbilityTrigger>;
  private readonly attackAbilities: AttackAbilities;
  private readonly buffAbilities: BuffAbilities;
  private readonly activeBuffs: ActiveBuffs;
  private readonly character: Character;
  private readonly damageRecord: DamageRecord;
  private hasBegunCombat = false;

  public beginCombat() {
    if (this.hasBegunCombat) throw new Error("Combat already in progress");

    this.registerResources();
    this.registerAttacks();
    this.registerMockAttacks();
    this.registerBuffs();

    this.subscribeToEvents();

    this.addStartingResources();
    this.hasBegunCombat = true;
    this.eventManager.publishCombatStarted({});
  }

  public performAttack(id: AttackId, options?: AbilityTriggerOptions) {
    if (!this.hasBegunCombat)
      throw new Error("Combat has not begun. Call beginCombat() first.");

    if (!this.getAvailableAttacks().includes(id))
      throw new Error(`Attack ${id} is not available to be performed`);

    this.eventManager.publishAbilityTriggerRequest({ id, options });

    // Advance tick to start the attack, then finish it
    this.advanceTick();
    this.finishOngoingForegroundAttacks();
  }

  public getAvailableAttacks(): AttackId[] {
    return this.attackAbilities.items
      .filter((attack) => attack.canPlayerTrigger())
      .map((attack) => attack.id);
  }

  public switchToWeapon(weapon: Weapon) {
    this.activeWeapon.switchTo(weapon);
    this.advanceTick();
  }

  public getWeaponsToSwitchTo() {
    return this.activeWeapon.getWeaponsToSwitchTo();
  }

  /** Returns a summary of the damage dealt so far */
  public generateDamageSummary() {
    return this.damageRecord.generateSummary();
  }

  /** Returns a buff summary of the last attack hit */
  public generateLastBuffSummary() {
    return this.damageRecord.generateLastBuffSummary();
  }

  /** Perform a simple mock attack using the current active weapon for the purposes of testing damage. E.g. for gear comparison */
  public performMockAttack() {
    const activeWeapon = this.activeWeapon.current;
    if (!activeWeapon)
      throw new Error("No active weapon to perform mock attack");

    this.performAttack(`mock-attack-${activeWeapon.id}`);
  }

  /** Trigger all buffs (to max stacks). This will trigger all buffs as long as requirements are met */
  public triggerAllBuffs() {
    this.buffAbilities.items.forEach((buffAbility) => {
      for (let i = 0; i < buffAbility.maxStacks; i++) {
        buffAbility.trigger();
      }
    });
    this.advanceTick();
  }

  /** Adds a resource amount (if needed) to make all resources max */
  public maxAllResources() {
    this.resources.items.forEach((resource) => {
      resource.add(resource.maxAmount);
    });
    this.advanceTick();
  }

  /** Advance and process ticks until there are no ongoing foreground attacks */
  private finishOngoingForegroundAttacks() {
    while (this.attackAbilities.hasOngoingForegroundAttack()) {
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
    this.advanceTick();
  }

  private registerResources() {
    const resources = this.team
      .getEquippedWeapons()
      .flatMap((weapon) =>
        weapon.resourceDefinitions.map((resourceDefinition) =>
          this.createResource(resourceDefinition),
        ),
      );

    this.resources.addItems(resources);
  }

  private registerAttacks() {
    for (const weapon of this.team.getEquippedWeapons()) {
      for (const definition of weapon.attackDefinitions) {
        const attack = this.createAttackAbility(definition, weapon);
        this.attackAbilities.add(attack);
        this.abilityTriggers.add(this.createAbilityTrigger(attack, definition));
      }
    }
  }

  /** Add mock attack ability for each weapon */
  private registerMockAttacks() {
    this.team.getEquippedWeapons().forEach((weapon) => {
      const mockAttackDefinition: AttackAbilityDefinition = {
        id: `mock-attack-${weapon.id}`,
        displayName: `${weapon.id} attack`,
        cooldown: 0,
        duration: tickDuration,
        requirements: {},
        canBePlayerTriggered: true,
        triggeredBy: {},
        type: "normal",
        elementalType: { defaultElementalType: weapon.damageElement },
        isForegroundAttack: true,
        baseDamageModifiers: {
          damageDealtIsPerSecond: false,
          attackMultiplier: 1,
          attackFlat: 0,
        },
        finalDamageModifiers: {},
        hitCount: { numberOfHitsFixed: 1 },
        doesNotTriggerEvents: true,
      };
      const mockAttackAbility = this.createAttackAbility(
        mockAttackDefinition,
        weapon,
      );

      this.attackAbilities.add(mockAttackAbility);
      this.abilityTriggers.add(
        this.createAbilityTrigger(mockAttackAbility, mockAttackDefinition),
      );
    });
  }

  private registerBuffs() {
    const buffAbilityDefinitions: {
      source: BuffSource;
      abilityDefinitions: BuffAbilityDefinition[];
    }[] = [
      {
        source: "weapon",
        abilityDefinitions: this.team.getWeaponBuffDefinitions(),
      },
      {
        source: "matrix",
        abilityDefinitions: this.team.getMatrixBuffDefinitions(),
      },
      { source: "team", abilityDefinitions: teamBuffs },
      {
        source: "simulacra",
        abilityDefinitions: this.simulacrumTrait?.buffs ?? [],
      },
      // { source: "relic", abilityDefinitions: relics.passiveRelicBuffs },
    ];

    for (const { source, abilityDefinitions } of buffAbilityDefinitions) {
      for (const abilityDef of abilityDefinitions) {
        const { id } = abilityDef;

        const baseAttackBuffs =
          abilityDef.baseAttackBuffs?.flatMap((baseAttackBuffDef) =>
            BaseAttackBuff.create(baseAttackBuffDef, id),
          ) ?? [];

        const attackPercentBuffs =
          abilityDef.attackPercentBuffs?.flatMap((attackBuffDef) =>
            AttackPercentBuff.create(attackBuffDef, id),
          ) ?? [];

        const elementalDamageBuffs =
          abilityDef.elementalDamageBuffs?.flatMap((elementalDamageBuffDef) =>
            ElementalDamageBuff.create(elementalDamageBuffDef, id, source),
          ) ?? [];

        const finalDamageBuffs =
          abilityDef.finalDamageBuffs?.map((finalDamageBuffDef) =>
            FinalDamageBuff.create(finalDamageBuffDef, id, source),
          ) ?? [];

        const critRateBuffs =
          abilityDef.critRateBuffs?.map((critRateBuffDef) =>
            CritRateBuff.create(critRateBuffDef, id),
          ) ?? [];

        const critDamageBuffs =
          abilityDef.critDamageBuffs?.map((critDamageBuffDef) =>
            CritDamageBuff.create(critDamageBuffDef, id),
          ) ?? [];

        const buffAbility = new BuffAbility(
          id,
          abilityDef.displayName,
          abilityDef.description,
          abilityDef.cooldown,
          abilityDef.duration,
          abilityDef.canBePlayerTriggered,
          this.createRequirements(abilityDef.requirements),
          abilityDef.updatesResources ?? [],
          new BuffTimeline(this.combatDuration),
          this.eventManager,
          this.currentTick,
          abilityDef.maxStacks,
          baseAttackBuffs,
          attackPercentBuffs,
          elementalDamageBuffs,
          finalDamageBuffs,
          critRateBuffs,
          critDamageBuffs,
        );
        this.buffAbilities.add(buffAbility);

        this.abilityTriggers.add(
          this.createAbilityTrigger(buffAbility, abilityDef),
        );
      }
    }
  }

  private subscribeToEvents() {
    for (const subscriber of [
      ...this.resources.items,
      ...this.attackAbilities.items,
      ...this.buffAbilities.items,
      ...this.abilityTriggers.items,
      this.damageRecord,
    ]) {
      subscriber.subscribeToEvents();
    }
  }

  private createFixedResources() {
    const charge = new Charge(
      chargeDefinition.id,
      chargeDefinition.displayName,
      chargeDefinition.maxAmount,
      chargeDefinition.startingAmount ?? 0,
      chargeDefinition.regenerate ?? {},
      new ResourceTimeline(this.combatDuration),
      this.eventManager,
      this.currentTick,
    );
    const dodge = this.createResource(dodgeResourceDefinition);
    const endurance = this.createResource(enduranceDefinition);
    return { charge, dodge, endurance };
  }

  private createResource(definition: ResourceDefinition) {
    return new Resource(
      definition.id,
      definition.displayName,
      definition.maxAmount,
      definition.startingAmount ?? 0,
      definition.regenerate ?? {},
      new ResourceTimeline(this.combatDuration),
      this.eventManager,
      this.currentTick,
    );
  }

  private createRequirements(definition: AbilityRequirementsDefinition) {
    return new AbilityRequirements(
      this.team,
      this.activeWeapon,
      this.currentResources,
      this.activeBuffs,
      definition.activeBuff,
      new ActiveWeaponRequirements(
        definition.activeWeapon?.is,
        definition.activeWeapon?.isNot,
      ),
      new TeamRequirements(
        definition.teamRequirements?.anyWeapon,
        new WeaponResonanceRequirements(
          definition.teamRequirements?.weaponResonance?.is,
          definition.teamRequirements?.weaponResonance?.isNot,
        ),
        new ElementalWeaponRequirements(
          definition.teamRequirements?.elementalWeapons?.numOfElementalWeapons,
          definition.teamRequirements?.elementalWeapons?.numOfNotElementalWeapons,
          definition.teamRequirements?.elementalWeapons?.numOfDifferentElementalTypes,
        ),
      ),
      new ResourceRequirements(definition.hasResource),
    );
  }

  private createAttackAbility(
    definition: AttackAbilityDefinition,
    weapon: Weapon,
  ) {
    return new AttackAbility(
      definition.id,
      definition.displayName,
      definition.description,
      definition.cooldown,
      definition.duration,
      definition.canBePlayerTriggered,
      this.createRequirements(definition.requirements),
      definition.updatesResources ?? [],
      new AttackTimeline(this.combatDuration),
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
      this.currentResources,
    );
  }

  private createAbilityTrigger(
    ability: Ability,
    definition: AbilityDefinition,
  ) {
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
      triggeredBy.resourceUpdate,
    );
  }
}
