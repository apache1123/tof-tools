import { nanoid } from 'nanoid';

import type { CoreElementalType } from '../constants/elemental-type';
import type { Dto } from './dto';
import type { GearSet, GearSetDtoV2 } from './gear-set';
import type { LoadoutStatsDto } from './loadout-stats';
import { LoadoutStats } from './loadout-stats';
import type { Persistable } from './persistable';
import type { Team, TeamDto } from './team';

export class Loadout implements Persistable<LoadoutDto> {
  private _id: string;

  public name: string;
  public elementalType: CoreElementalType;
  public team: Team;
  public gearSet: GearSet;
  public loadoutStats: LoadoutStats;

  public constructor(
    name: string,
    elementalType: CoreElementalType,
    team: Team,
    gearSet: GearSet
  ) {
    this._id = nanoid();
    this.name = name;
    this.elementalType = elementalType;
    this.team = team;
    this.gearSet = gearSet;
    this.loadoutStats = new LoadoutStats(this);
  }

  public get id() {
    return this._id;
  }

  public copyFromDto(dto: LoadoutDto): void {
    const { id, name, elementalType, team, gearSet, loadoutStats } = dto;

    this._id = id;
    this.name = name;
    this.elementalType = elementalType;
    this.team.copyFromDto(team);
    this.gearSet.copyFromDto(gearSet);
    this.loadoutStats.copyFromDto(loadoutStats);
  }

  public toDto(): LoadoutDto {
    const { id, name, elementalType, team, gearSet, loadoutStats } = this;

    return {
      id,
      name,
      elementalType,
      team: team.toDto(),
      gearSet: gearSet.toDto(),
      loadoutStats: loadoutStats.toDto(),
      version: 1,
    };
  }
}

export interface LoadoutDto extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDto;
  gearSet: GearSetDtoV2;
  loadoutStats: LoadoutStatsDto;
  version: 1;
}
