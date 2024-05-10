import type { AbilityRequirementsChecker } from '../ability/ability-requirements-checker';
import type { Charge } from '../charge/charge';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { Attack } from './attack';

export class AttackAvailabilityChecker {
  public constructor(
    private readonly weaponTracker: WeaponTracker,
    private readonly charge: Charge,
    private readonly abilityRequirementsChecker: AbilityRequirementsChecker
  ) {}

  public isAttackAvailableAt(attack: Attack, time: number): boolean {
    if (
      !this.abilityRequirementsChecker.hasRequirementsBeenMetAt(
        attack.requirements,
        time
      )
    )
      return false;

    // If there is a full charge and an active weapon, only discharge attacks are available for the other weapons. If there is no active weapon ,e.g. at combat start, it doesn't matter.
    // This is a special case that's not being checked by the ability requirements above
    const activeWeapon = this.weaponTracker.getActiveWeapon(time);
    const hasFullCharge = this.charge.hasFullCharge(time);
    if (!activeWeapon || !hasFullCharge) return true;

    if (attack.weapon !== this.weaponTracker.getActiveWeapon(time)) {
      return attack.type === 'discharge';
    }

    return true;
  }
}
