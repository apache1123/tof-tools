import type { Team } from "../../../models/team/team";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { TeamDto } from "./team-dto";
import { dtoToTeam, teamToDto } from "./team-dto";

export class TeamRepository extends ValtioRepository<Team, TeamDto> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: Team): TeamDto {
    return teamToDto(item);
  }

  protected override dtoToItem(dto: TeamDto): Team {
    return dtoToTeam(dto, this.db.get("weapons"));
  }
}
