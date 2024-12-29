import type { TeamPreset } from "../../../models/team/team-preset";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { TeamPresetDto } from "./dtos/team-preset-dto";
import { dtoToTeamPreset, teamPresetToDto } from "./dtos/team-preset-dto";

export class TeamPresetRepository extends ValtioRepository<
  TeamPreset,
  TeamPresetDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: TeamPreset): TeamPresetDto {
    return teamPresetToDto(item);
  }

  protected override dtoToItem(dto: TeamPresetDto): TeamPreset {
    return dtoToTeamPreset(dto, this.db.get("weaponPresets"));
  }
}
