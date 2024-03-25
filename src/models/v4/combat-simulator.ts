import { commonWeaponAttackBuffs } from '../../constants/common-weapon-attack-buffs';
import { commonWeaponDamageBuffs } from '../../constants/common-weapon-damage-buffs';
import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { AttackCommand } from './attack/attack-command';
import { AttackBuff } from './attack-buff/attack-buff';
import type { AttackBuffDefinition } from './attack-buff/attack-buff-definition';
import { AttackBuffGroup } from './attack-buff/attack-buff-group';
import { DamageBuff } from './damage-buff/damage-buff';
import type { DamageBuffDefinition } from './damage-buff/damage-buff-definition';
import { DamageBuffGroup } from './damage-buff/damage-buff-group';
import { Effect } from './effect/effect';
import { EffectEvaluator } from './effect/effect-evaluator';
import { EffectGroup } from './effect/effect-group';
import { EffectPool } from './effect/effect-pool';
import { EffectTrigger } from './effect/effect-trigger';
import { MiscellaneousBuff } from './miscellaneous-buff/miscellaneous-buff';
import { MiscellaneousBuffGroup } from './miscellaneous-buff/miscellaneous-buff-group';
import type { Relics } from './relics';
import { AttackEvent } from './timelines/attack-event';
import { AttackTimeline } from './timelines/attack-timeline';
import { ChargeTimeline } from './timelines/charge-timeline';
import { EffectTimeline } from './timelines/effect-timeline';

export class CombatSimulator {
  public readonly attackTimelines = new Map<Weapon, AttackTimeline>();
  public readonly chargeTimeline: ChargeTimeline;
  public readonly effectPool: EffectPool;

  private _activeWeapon: Weapon | undefined;
  /** The previous weapon before switching to the current active weapon */
  private _previousWeapon: Weapon | undefined;

  public constructor(
    public readonly combatDuration: number,
    private readonly loadout: Loadout,
    private readonly relics: Relics
  ) {
    const {
      team: { weapons },
      simulacrumTrait,
    } = loadout;

    weapons.forEach((weapon) => {
      this.attackTimelines.set(weapon, new AttackTimeline(combatDuration));
    });

    this.chargeTimeline = new ChargeTimeline(combatDuration);

    const weaponAttackBuffs = new Map(
      weapons
        .flatMap<AttackBuffDefinition>((weapon) =>
          weapon.definition.commonAttackBuffs.map(
            (buffId) => commonWeaponAttackBuffs[buffId]
          )
        )
        .concat(weapons.flatMap((weapon) => weapon.definition.attackBuffs))
        .map((attackBuffDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [
            attackBuffDefinition.id,
            new AttackBuff(attackBuffDefinition, timeline),
          ];
        })
    );

    const weaponDamageBuffs = new Map(
      weapons
        .flatMap<DamageBuffDefinition>((weapon) =>
          weapon.definition.commonDamageBuffs.map(
            (buffId) => commonWeaponDamageBuffs[buffId]
          )
        )
        .concat(weapons.flatMap((weapon) => weapon.definition.damageBuffs))
        .map((damageBuffDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [
            damageBuffDefinition.id,
            new DamageBuff(damageBuffDefinition, timeline),
          ];
        })
    );

    const weaponEffects = new Map(
      weapons
        .flatMap((weapon) => weapon.definition.effects)
        .map((effectDefinition) => {
          const timeline = new EffectTimeline(combatDuration);
          return [effectDefinition.id, new Effect(effectDefinition, timeline)];
        })
    );

    const traitAttackBuffs = new Map(
      (simulacrumTrait?.attackBuffs ?? []).map((attackBuffDefinition) => {
        const timeline = new EffectTimeline(combatDuration);
        return [
          attackBuffDefinition.id,
          new AttackBuff(attackBuffDefinition, timeline),
        ];
      })
    );
    const traitDamageBuffs = new Map(
      (simulacrumTrait?.damageBuffs ?? []).map((damageBuffDefinition) => {
        const timeline = new EffectTimeline(combatDuration);
        return [
          damageBuffDefinition.id,
          new DamageBuff(damageBuffDefinition, timeline),
        ];
      })
    );
    const traitMiscBuffs = new Map(
      (simulacrumTrait?.miscellaneousBuffs ?? []).map((miscBuffDefinition) => {
        const timeline = new EffectTimeline(combatDuration);
        return [
          miscBuffDefinition.id,
          new MiscellaneousBuff(miscBuffDefinition, timeline),
        ];
      })
    );

    const relicDamageBuffs = new Map(
      relics.passiveRelicBuffs.map((damageBuffDefinition) => {
        const timeline = new EffectTimeline(combatDuration);
        return [
          damageBuffDefinition.id,
          new DamageBuff(damageBuffDefinition, timeline),
        ];
      })
    );

    this.effectPool = new EffectPool(
      [
        new AttackBuffGroup('Weapon attack buffs', weaponAttackBuffs),
        new AttackBuffGroup('Trait attack buffs', traitAttackBuffs),
      ],
      [
        new DamageBuffGroup('Weapon damage buffs', weaponDamageBuffs),
        new DamageBuffGroup('Trait damage buffs', traitDamageBuffs),
        new DamageBuffGroup('Relic damage buffs', relicDamageBuffs),
      ],
      [new MiscellaneousBuffGroup('Trait miscellaneous buffs', traitMiscBuffs)],
      [new EffectGroup('Weapon effects', weaponEffects)]
    );
  }

  public get activeWeapon(): Weapon | undefined {
    return this._activeWeapon;
  }

  public get availableAttacks(): AttackCommand[] {
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

  public performAttack(attackCommand: AttackCommand) {
    const { weapon, attackDefinition } = attackCommand;
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
      attackCommand
    );

    if (
      attackDefinition.followLastWeaponElementalType &&
      this._previousWeapon
    ) {
      attackEvent.elementalType = this._previousWeapon.definition.damageElement;
    }

    attackTimeline.addEvent(attackEvent);

    this.adjustCharge(attackEvent);

    this.triggerEffects(attackEvent);
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

  private triggerEffects(attackEvent: AttackEvent) {
    for (const effectGroup of this.effectPool.allEffectGroups) {
      for (const effect of effectGroup.items.values()) {
        const effectEvaluator = new EffectEvaluator(
          effect,
          attackEvent,
          this.effectPool,
          this.loadout.team,
          this.combatDuration
        );
        const effectTrigger = new EffectTrigger(effect, effectEvaluator);
        effectTrigger.trigger();
      }
    }
  }
}
