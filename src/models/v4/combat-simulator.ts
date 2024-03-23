import type { Loadout } from '../loadout';
import type { Weapon } from '../weapon';
import type { AttackCommand } from './attacks/attack-command';
import { EffectPool } from './effects/effect-pool';
import type { Relics } from './relics';
import { AttackEvent } from './timelines/attack-event';
import { AttackTimeline } from './timelines/attack-timeline';
import { ChargeTimeline } from './timelines/charge-timeline';

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
    loadout.team.weapons.forEach((weapon) => {
      this.attackTimelines.set(
        weapon,
        new AttackTimeline(weapon.definition.displayName, combatDuration)
      );
    });

    this.chargeTimeline = new ChargeTimeline('Weapon charge', combatDuration);
    this.effectPool = new EffectPool(combatDuration, loadout, relics);
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

    this.effectPool.triggerEffects(attackEvent);
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
}
