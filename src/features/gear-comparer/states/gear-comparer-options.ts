import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../constants/elemental-type';
import type { Dto } from '../../../models/dto';
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
      version: 1,
    };
  }
}

export interface GearComparerOptionsStateDto extends Dto {
  selectedElementalType: CoreElementalType | undefined;
  version: 1;
}

export const gearComparerOptionsStateKey = 'gearComparerOptions';

export const gearComparerOptionsState = proxy<GearComparerOptionsState>(
  new GearComparerOptionsState()
);
devtools(gearComparerOptionsState, { name: gearComparerOptionsStateKey });
