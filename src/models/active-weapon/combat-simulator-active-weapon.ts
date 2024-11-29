import { weaponSwitchCooldownDuration } from "../../definitions/active-weapon";
import { consoleErrorDev } from "../../utils/dev-utils";
import type { EventManager } from "../event/event-manager";
import type { CurrentTick } from "../tick/current-tick";
import { TimeInterval } from "../time-interval/time-interval";
import type { Weapon } from "../weapon/weapon";
import type { ActiveWeapon } from "./active-weapon";
import { ActiveWeaponEvent } from "./active-weapon-event";
import type { ActiveWeaponTimeline } from "./active-weapon-timeline";
import { WeaponSwitchCooldownEvent } from "./weapon-switch-cooldown-event";
import { WeaponSwitchCooldownTimeline } from "./weapon-switch-cooldown-timeline";

export class CombatSimulatorActiveWeapon implements ActiveWeapon {
  public constructor(
    private readonly weapons: Weapon[],
    private readonly timeline: ActiveWeaponTimeline,
    private readonly eventManager: EventManager,
    private readonly currentTick: CurrentTick,
  ) {
    this.weaponSwitchCooldownTimeline = new WeaponSwitchCooldownTimeline(
      timeline.endTime,
    );
  }

  private readonly weaponSwitchCooldownTimeline: WeaponSwitchCooldownTimeline;

  /** The current active weapon */
  public get current(): Weapon | undefined {
    return this.getActiveWeaponEvent()?.weapon;
  }

  public switchTo(weapon: Weapon) {
    if (!this.getWeaponsToSwitchTo().includes(weapon)) {
      consoleErrorDev(`Weapon ${weapon.id} cannot be switched to`);
      return;
    }

    this.timeline.addEvent(
      new ActiveWeaponEvent(
        new TimeInterval(this.currentTick.startTime, this.currentTick.endTime),
        weapon,
      ),
    );

    // If there is a current active weapon, track its weapon switch cooldown
    if (this.current) {
      this.weaponSwitchCooldownTimeline.addEvent(
        new WeaponSwitchCooldownEvent(
          new TimeInterval(
            this.currentTick.startTime,
            this.currentTick.startTime + weaponSwitchCooldownDuration,
          ),
          this.current,
        ),
      );
    }

    this.eventManager.publishActiveWeaponChanged({
      id: weapon.id,
      damageElement: weapon.damageElement,
    });
  }

  /** The previous weapon before switching to the current active weapon */
  public get previous(): Weapon | undefined {
    const lastEvent = this.getActiveWeaponEvent();
    if (!lastEvent) return undefined;

    return this.getLastEventBefore(lastEvent.startTime)?.weapon;
  }

  public getWeaponsToSwitchTo() {
    return this.weapons.filter(
      (weapon) =>
        weapon !== this.current &&
        !this.weaponSwitchCooldownTimeline.isOnCooldown(
          weapon,
          this.currentTick.startTime,
        ),
    );
  }

  private getActiveWeaponEvent() {
    return this.getLastEventBefore(this.currentTick.startTime);
  }

  private getLastEventBefore(time: number) {
    return this.timeline.getLatestEventBefore(time);
  }
}
