import { nanoid } from 'nanoid';

import type { CoreElementalType } from '../constants/elemental-type';
import type { Dto } from './dto';
import type {
  ElementalUserStats,
  ElementalUserStatsDtoV1,
} from './elemental-user-stats';
import type { GearSet, GearSetDto } from './gear-set';
import type { Persistable } from './persistable';
import type { Team, TeamDto } from './team';

export class Loadout implements Persistable<LoadoutDto> {
  private _id: string;

  public gearSet: GearSet;
  public team: Team;
  public elementalType: CoreElementalType | undefined;
  public elementalUserStats: ElementalUserStats;

  public constructor(
    gearSet: GearSet,
    team: Team,
    elementalUserStats: ElementalUserStats
  ) {
    this._id = nanoid();
    this.gearSet = gearSet;
    this.team = team;
    this.elementalUserStats = elementalUserStats;
  }

  public get id() {
    return this._id;
  }

  public copyFromDto(dto: LoadoutDto): void {
    throw new Error('Method not implemented.');
  }

  public toDto(): LoadoutDto {
    throw new Error('Method not implemented.');
  }
}

export interface LoadoutDto extends Dto {
  gearSet: GearSetDto;
  team: TeamDto;
  elementalUserStats: ElementalUserStatsDtoV1;
  version: 1;
}
