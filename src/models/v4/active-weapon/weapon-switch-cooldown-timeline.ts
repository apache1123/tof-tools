import type { Weapon } from '../../weapon';
import { Timeline } from '../timeline/timeline';
import type { WeaponSwitchCooldownEvent } from './weapon-switch-cooldown-event';

export class WeaponSwitchCooldownTimeline extends Timeline<WeaponSwitchCooldownEvent> {
  public isOnCooldown(weapon: Weapon, time: number): boolean {
    return this.getEventsAt(time).some((event) => event.weapon === weapon);
  }
}
