import type { BuffId } from '../../../definitions/types/buff/buff-ability';
import type { CombatState } from '../combat-state/combat-state';
import type { Requirements } from '../requirements/requirements';
import type { ResourceRequirements } from '../resource/resource-requirements';
import type { TeamRequirements } from '../team/team-requirements';
import type { ActiveWeaponRequirements } from '../weapon/active-weapon-requirements';

export class AbilityRequirements implements Requirements {
  public constructor(
    private readonly activeBuff?: BuffId,
    private readonly activeWeaponRequirements?: ActiveWeaponRequirements,
    private readonly teamRequirements?: TeamRequirements,
    private readonly resourceRequirements?: ResourceRequirements
  ) {}

  public haveBeenMet(state: CombatState): boolean {
    if (this.activeBuff && !state.activeBuffs.hasBuff(this.activeBuff))
      return false;

    if (
      this.activeWeaponRequirements &&
      !this.activeWeaponRequirements.haveBeenMet(state.activeWeapon)
    )
      return false;

    if (this.teamRequirements && !this.teamRequirements.haveBeenMet(state.team))
      return false;

    if (
      this.resourceRequirements &&
      !this.resourceRequirements.haveBeenMet(state.resources)
    )
      return false;

    return true;
  }
}
