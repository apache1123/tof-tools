import type { BuffId } from "../../../definitions/types/buff/buff-ability";
import type { Team } from "../../team";
import type { ActiveWeapon } from "../active-weapon/active-weapon";
import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import type { Requirements } from "../requirements/requirements";
import type { CurrentResources } from "../resource/current-resource/current-resources";
import type { ResourceRequirements } from "../resource/resource-requirements";
import type { TeamRequirements } from "../team/team-requirements";
import type { ActiveWeaponRequirements } from "../weapon/active-weapon-requirements";

export class AbilityRequirements implements Requirements {
  public constructor(
    private readonly team: Team,
    private readonly activeWeapon: ActiveWeapon,
    private readonly currentResources: CurrentResources,
    private readonly activeBuffs: ActiveBuffs,
    private readonly activeBuff?: BuffId,
    private readonly activeWeaponRequirements?: ActiveWeaponRequirements,
    private readonly teamRequirements?: TeamRequirements,
    private readonly resourceRequirements?: ResourceRequirements,
  ) {}

  public haveBeenMet(): boolean {
    if (this.activeBuff && !this.activeBuffs.hasBuff(this.activeBuff))
      return false;

    if (
      this.activeWeaponRequirements &&
      !this.activeWeaponRequirements.haveBeenMet(this.activeWeapon.current)
    )
      return false;

    if (this.teamRequirements && !this.teamRequirements.haveBeenMet(this.team))
      return false;

    if (
      this.resourceRequirements &&
      !this.resourceRequirements.haveBeenMet(this.currentResources.all)
    )
      return false;

    return true;
  }
}
