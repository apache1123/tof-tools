import type { CoreElementalType } from '../../../constants/elemental-type';
import type { Dto } from '../../../models/dto';

// export class GearComparerOptionsState
//   implements Persistable<GearComparerOptionsStateDto>
// {
//   public selectedElementalType: CoreElementalType | undefined;

//   public copyFromDto(dto: GearComparerOptionsStateDto): void {
//     const { selectedElementalType } = dto;
//     this.selectedElementalType = selectedElementalType;
//   }

//   public toDto(): GearComparerOptionsStateDto {
//     const { selectedElementalType } = this;
//     return {
//       selectedElementalType,
//       version: 1,
//     };
//   }
// }

/** @deprecated Migrated when switching to Loadouts */
export interface GearComparerOptionsStateDto extends Dto {
  selectedElementalType: CoreElementalType | undefined;
  version: 1;
}

// export const gearComparerOptionsStateKey = 'gearComparerOptions';

// export const gearComparerOptionsState = proxy<GearComparerOptionsState>(
//   new GearComparerOptionsState()
// );
// devtools(gearComparerOptionsState, { name: gearComparerOptionsStateKey });
