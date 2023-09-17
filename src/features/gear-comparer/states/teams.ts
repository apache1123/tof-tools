import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../constants/elemental-type';
import type { DataById } from '../../../models/data';
import type { Persistable } from '../../../models/persistable';
import type { TeamDTO } from '../../../models/team';
import { Team } from '../../../models/team';

export class TeamsState implements Persistable<TeamsStateDTO> {
  public teamsByElement: DataById<CoreElementalType, Team>;

  public constructor() {
    this.teamsByElement = {
      Flame: new Team(),
      Frost: new Team(),
      Physical: new Team(),
      Volt: new Team(),
    };
  }

  public copyFromDTO(dto: TeamsStateDTO): void {
    const {
      teamsByElement: { Flame, Frost, Physical, Volt },
    } = dto;

    this.teamsByElement.Flame.copyFromDTO(Flame);
    this.teamsByElement.Frost.copyFromDTO(Frost);
    this.teamsByElement.Physical.copyFromDTO(Physical);
    this.teamsByElement.Volt.copyFromDTO(Volt);
  }

  public toDTO(): TeamsStateDTO {
    const {
      teamsByElement: { Flame, Frost, Physical, Volt },
    } = this;

    return {
      teamsByElement: {
        Flame: Flame.toDTO(),
        Frost: Frost.toDTO(),
        Physical: Physical.toDTO(),
        Volt: Volt.toDTO(),
      },
    };
  }
}

export interface TeamsStateDTO {
  teamsByElement: DataById<CoreElementalType, TeamDTO>;
}

export const teamsStateKey = 'teams';

export const teamsState = proxy<TeamsState>(new TeamsState());
devtools(teamsState, { name: teamsStateKey });
