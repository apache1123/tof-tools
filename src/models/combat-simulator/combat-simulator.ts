import {
  chargeDefinition,
  dodgeResourceDefinition,
  enduranceDefinition,
} from "../../definitions/resources";
import { teamBuffs } from "../../definitions/team-buffs";
import { tickDuration } from "../../definitions/tick";
import type { AbilityDefinition } from "../../definitions/types/ability/ability-definition";
import type { AbilityRequirementsDefinition } from "../../definitions/types/ability/ability-requirements-definition";
import type { AttackId } from "../../definitions/types/attack/attack-ability-definition";
import type { BuffAbilityDefinition as BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability-definition";
import type { Ability } from "../ability/ability";
import { AbilityRequirements } from "../ability/ability-requirements";
import { AbilityTrigger } from "../ability/ability-trigger";
import type { AbilityTriggerOptions } from "../ability/ability-trigger-options";
import { ActiveWeaponTimeline } from "../active-weapon/active-weapon-timeline";
import { CombatSimulatorActiveWeapon } from "../active-weapon/combat-simulator-active-weapon";
import { AttackAbilities } from "../attack/attack-abilities";
import { AttackAbility } from "../attack/attack-ability";
import { AttackTimeline } from "../attack/attack-timeline";
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
import { UtilizedBuffs } from "../buff/utilized-buffs";
import { Character } from "../character/character";
import type { CharacterData } from "../character/character-data";
import { Charge } from "../charge/charge";
import { DamageRecord } from "../damage-record/damage-record";
import { DamageRecordTimeline } from "../damage-record/damage-record-timeline";
import { EventManager } from "../event/event-manager";
import type { EventSubscriber } from "../event/event-subscriber";
import type { GearSet } from "../gear/gear-set";
import type { Relics } from "../relics/relics";
import { Repository } from "../repository/repository";
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
    simulacrumTrait: SimulacrumTrait | undefined,
    relics: Relics,
    options: CombatSimulatorOptions,
  ) {
    const { combatDuration, targetResistance } = options;

    this.eventManager = new EventManager();

    this.target = { resistance: targetResistance };

    this.team = team;
    const weapons = team.getEquippedWeapons();

    const startingTickInterval = new TimeInterval(-tickDuration, 0);
    this.currentTick = new CurrentTick(
      startingTickInterval.startTime,
      tickDuration,
      this.eventManager,
    );
    this.activeWeapon = new CombatSimulatorActiveWeapon(
      weapons,
      new ActiveWeaponTimeline(combatDuration),
      this.eventManager,
      this.currentTick,
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
        this.currentTick,
      );
    const charge = new Charge(
      chargeDefinition.id,
      chargeDefinition.displayName,
      chargeDefinition.maxAmount,
      chargeDefinition.startingAmount ?? 0,
      chargeDefinition.regenerate ?? {},
      new ResourceTimeline(combatDuration),
      this.eventManager,
      this.currentTick,
    );
    const dodge = createResource(dodgeResourceDefinition);
    const endurance = createResource(enduranceDefinition);
    const customResources = weapons.flatMap((weapon) =>
      weapon.resourceDefinitions.map((resourceDefinition) =>
        createResource(resourceDefinition),
      ),
    );
    this.resources = new Resources(charge, [
      dodge,
      endurance,
      ...customResources,
    ]);
    this.currentResources = new CurrentResources(this.resources);

    const createRequirements = (
      definition: AbilityRequirementsDefinition,
    ): AbilityRequirements =>
      new AbilityRequirements(
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

    const createAbilityTrigger = (
      ability: Ability,
      definition: AbilityDefinition,
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
        triggeredBy.resourceUpdate,
      );
    };

    const abilityTriggers: AbilityTrigger[] = [];

    this.attackAbilities = new AttackAbilities();
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
          this.currentResources,
        );
        this.attackAbilities.add(attack);

        abilityTriggers.push(createAbilityTrigger(attack, definition));
      }
    }

    const buffAbilityDefinitions: {
      source: BuffSource;
      abilityDefinitions: BuffAbilityDefinition[];
    }[] = [
      {
        source: "weapon",
        abilityDefinitions: weapons.flatMap((weapon) => weapon.buffDefinitions),
      },
      {
        source: "matrix",
        abilityDefinitions: [], // TODO:
        //   weapons.flatMap((weapon) =>
        //   weapon.matrixSets
        //     .getMatrixSets()
        //     .flatMap((matrixSet) => matrixSet.buffs),
        // ),
      },
      { source: "team", abilityDefinitions: teamBuffs },
      { source: "simulacra", abilityDefinitions: simulacrumTrait?.buffs ?? [] },
      { source: "relic", abilityDefinitions: relics.passiveRelicBuffs },
    ];

    this.buffAbilities = new BuffAbilities();
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
          attackPercentBuffs,
          elementalDamageBuffs,
          finalDamageBuffs,
          critRateBuffs,
          critDamageBuffs,
        );
        this.buffAbilities.add(buffAbility);

        abilityTriggers.push(createAbilityTrigger(buffAbility, abilityDef));
      }
    }

    this.activeBuffs = new ActiveBuffs(this.buffAbilities);

    this.character = new Character(
      characterData,
      team,
      gearSet,
      simulacrumTrait,
      this.activeBuffs,
      this.activeWeapon,
    );

    const utilizedBuffs = new UtilizedBuffs();
    this.damageRecord = new DamageRecord(
      new DamageRecordTimeline(combatDuration),
      this.currentTick,
      this.eventManager,
      this.character,
      this.target,
      this.activeBuffs,
      utilizedBuffs,
    );

    this.eventSubscribers.push(
      ...this.resources.items,
      ...this.attackAbilities.items,
      ...this.buffAbilities.items,
      ...abilityTriggers,
      this.damageRecord,
    );
  }

  private readonly eventManager: EventManager;
  private readonly target: Target;
  private readonly team: Team;
  private readonly currentTick: CurrentTick;
  private readonly activeWeapon: CombatSimulatorActiveWeapon;
  private readonly resources: Resources;
  private readonly currentResources: CurrentResources;
  private readonly attackAbilities: AttackAbilities;
  private readonly buffAbilities: BuffAbilities;
  private readonly activeBuffs: ActiveBuffs;
  private readonly character: Character;
  private readonly damageRecord: DamageRecord;
  private readonly eventSubscribers: EventSubscriber[] = [];
  private hasBegunCombat = false;

  private get abilities(): Repository<Ability> {
    const abilities = new Repository<Ability>();
    abilities.addItems([
      ...this.attackAbilities.items,
      ...this.buffAbilities.items,
    ]);
    return abilities;
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
  }

  public getWeaponsToSwitchTo() {
    return this.activeWeapon.getWeaponsToSwitchTo();
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
  }

  private subscribeEventSubscribers() {
    for (const subscriber of this.eventSubscribers) {
      subscriber.subscribeToEvents();
    }
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
