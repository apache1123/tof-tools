import type { AttackDefinition } from '../attack/attack-definition';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackElementalTypeOverwriteHandler extends AttackRequestHandler {
  public constructor(
    private readonly definition: AttackDefinition,
    private readonly weaponTracker: WeaponTracker
  ) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    this.overwriteElementalType(attackRequest);
    return super.handle(attackRequest);
  }

  private overwriteElementalType(attackRequest: AttackRequest) {
    const { elementalType } = this.definition;
    if (
      elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      attackRequest.elementalTypeOverwrite =
        this.weaponTracker.previousWeapon.definition.damageElement;
    }
  }
}
