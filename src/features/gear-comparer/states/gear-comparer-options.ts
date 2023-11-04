import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../constants/elemental-type';
import type { Persistable } from '../../../models/persistable';

export class GearComparerOptionsState
  implements Persistable<GearComparerOptionsStateDto>
{
  public selectedElementalType: CoreElementalType | undefined;

  public copyFromDto(dto: GearComparerOptionsStateDto): void {
    const { selectedElementalType } = dto;
    this.selectedElementalType = selectedElementalType;
  }

  public toDto(): GearComparerOptionsStateDto {
    const { selectedElementalType } = this;
    return {
      selectedElementalType,
    };
  }
}

export interface GearComparerOptionsStateDto {
  selectedElementalType: CoreElementalType | undefined;
}

export const gearComparerOptionsStateKey = 'gearComparerOptions';

export const gearComparerOptionsState = proxy<GearComparerOptionsState>(
  new GearComparerOptionsState()
);
devtools(gearComparerOptionsState, { name: gearComparerOptionsStateKey });
