import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { AttackRequest } from './attack-request';
import { AttackRequestHandler } from './attack-request-handler';

export class AttackElementalTypeOverwriteHandler extends AttackRequestHandler {
  public constructor(private readonly weaponTracker: WeaponTracker) {
    super();
  }

  public handle(attackRequest: AttackRequest): boolean {
    attackRequest.elementalTypeOverwrite =
      this.getElementalTypeOverwrite(attackRequest);
    return super.handle(attackRequest);
  }

  private getElementalTypeOverwrite(attackRequest: AttackRequest) {
    let elementalTypeOverwrite: WeaponElementalType | undefined;
    const {
      attackDefinition: { elementalType },
    } = attackRequest;

    if (
      elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      elementalTypeOverwrite =
        this.weaponTracker.previousWeapon.definition.damageElement;
    }

    return elementalTypeOverwrite;
  }
}
