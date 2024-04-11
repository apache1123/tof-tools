import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackWeaponSwitchHandler extends AttackRequestHandler {
  public constructor(private readonly weaponTracker: WeaponTracker) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    this.switchWeaponsIfNeeded(attackRequest);
    return super.handle(attackRequest);
  }

  private switchWeaponsIfNeeded(attackRequest: AttackRequest) {
    const { weapon } = attackRequest;
    if (this.weaponTracker.activeWeapon !== weapon) {
      this.weaponTracker.activeWeapon = weapon;
    }
  }
}
