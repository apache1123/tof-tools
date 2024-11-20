import type { Team } from "../team/team";
import type { Requirements } from "../v4/requirements/requirements";
import type { TeamRequirements } from "../v4/team/team-requirements";

export class GearCompareBuffAbilityRequirements implements Requirements {
  public constructor(
    private readonly team: Team,
    private readonly teamRequirements?: TeamRequirements,
  ) {}

  public haveBeenMet(): boolean {
    return (
      !this.teamRequirements || this.teamRequirements.haveBeenMet(this.team)
    );
  }
}
