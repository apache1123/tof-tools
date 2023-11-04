import { derive } from 'valtio/utils';

import type { ElementalUserStats } from '../../../../models/elemental-user-stats';
import { gearComparerOptionsState } from '../gear-comparer-options';
import { userStatsState } from '../user-stats/user-stats';

export interface SelectedElementalUserStatsState {
  selectedElementalUserStats: ElementalUserStats | undefined;
}

export const selectedElementalUserStatsState = derive<
  object,
  SelectedElementalUserStatsState
>({
  selectedElementalUserStats: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsState);
    if (!selectedElementalType) {
      return undefined;
    }

    return get(userStatsState).statsByElement[selectedElementalType];
  },
});

export function setBaseAttackFlat(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.loadoutStats.baseAttackFlat = value;
  }
}
export function setTotalAttackFlat(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.loadoutStats.totalAttackFlat = value;
  }
}
export function setCritFlat(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.loadoutStats.critFlat = value;
  }
}
export function setCritPercent(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.loadoutStats.critPercent = value;
  }
}
export function setCritDamage(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.loadoutStats.critDamage = value;
  }
}
export function setOtherGearElementalDamage(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.otherGearElementalDamage = value;
  }
}
export function setMiscAttackPercent(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscAttackPercent = value;
  }
}
export function setMiscCritRate(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscCritRate = value;
  }
}
export function setMiscCritDamage(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscCritDamage = value;
  }
}
