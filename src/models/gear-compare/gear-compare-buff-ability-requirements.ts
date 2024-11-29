import type { Requirements } from "../requirements/requirements";
import type { Team } from "../team/team";
import type { TeamRequirements } from "../team/team-requirements";

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
