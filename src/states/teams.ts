import type { CoreElementalType } from '../constants/elemental-type';
import type { DataById } from '../models/data';
import type { Dto } from '../models/dto';
import type { TeamDto } from '../models/team';

// export class TeamsState implements Persistable<TeamsStateDto> {
//   public teamsByElement: DataById<CoreElementalType, Team>;

//   public constructor() {
//     this.teamsByElement = {
//       Flame: new Team(),
//       Frost: new Team(),
//       Physical: new Team(),
//       Volt: new Team(),
//     };
//   }

//   public copyFromDto(dto: TeamsStateDto): void {
//     const {
//       teamsByElement: { Flame, Frost, Physical, Volt },
//     } = dto;

//     this.teamsByElement.Flame.copyFromDto(Flame);
//     this.teamsByElement.Frost.copyFromDto(Frost);
//     this.teamsByElement.Physical.copyFromDto(Physical);
//     this.teamsByElement.Volt.copyFromDto(Volt);
//   }

//   public toDto(): TeamsStateDto {
//     const {
//       teamsByElement: { Flame, Frost, Physical, Volt },
//     } = this;

//     return {
//       teamsByElement: {
//         Flame: Flame.toDto(),
//         Frost: Frost.toDto(),
//         Physical: Physical.toDto(),
//         Volt: Volt.toDto(),
//       },
//       version: 1,
//     };
//   }
// }

/** @deprecated Migrated to Loadouts */
export interface TeamsStateDto extends Dto {
  teamsByElement: DataById<CoreElementalType, TeamDto>;
  version: 1;
}

// export const teamsStateKey = 'teams';

// export const teamsState = proxy<TeamsState>(new TeamsState());
// devtools(teamsState, { name: teamsStateKey });
