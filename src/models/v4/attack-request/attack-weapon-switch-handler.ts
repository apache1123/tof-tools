import type { Weapon } from '../../weapon';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackWeaponSwitchHandler extends AttackRequestHandler {
  public constructor(
    private readonly weapon: Weapon,
    private readonly weaponTracker: WeaponTracker
  ) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    this.switchWeaponsIfNeeded();
    return super.handle(attackRequest);
  }

  private switchWeaponsIfNeeded() {
    if (this.weaponTracker.activeWeapon !== this.weapon) {
      this.weaponTracker.activeWeapon = this.weapon;
    }
  }
}
