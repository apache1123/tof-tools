import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../constants/elemental-type';
import type { Persistable } from '../../../models/persistable';

export class GearComparerOptionsState
  implements Persistable<GearComparerOptionsStateDTO>
{
  public selectedElementalType: CoreElementalType | undefined;

  public copyFromDTO(dto: GearComparerOptionsStateDTO): void {
    const { selectedElementalType } = dto;
    this.selectedElementalType = selectedElementalType;
  }

  public toDTO(): GearComparerOptionsStateDTO {
    const { selectedElementalType } = this;
    return {
      selectedElementalType,
    };
  }
}

export interface GearComparerOptionsStateDTO {
  selectedElementalType: CoreElementalType | undefined;
}

export const gearComparerOptionsStateKey = 'gearComparerOptions';

export const gearComparerOptionsState = proxy<GearComparerOptionsState>(
  new GearComparerOptionsState()
);
devtools(gearComparerOptionsState, { name: gearComparerOptionsStateKey });
