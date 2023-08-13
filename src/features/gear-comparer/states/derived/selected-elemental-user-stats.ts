import { derive } from 'valtio/utils';

import { gearComparerOptionsState } from '../gear-comparer-options';
import type { ElementalUserStats } from '../user-stats/user-stats';
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

export function setBaseAttackFlatWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.baseAttackFlatWithGearA = value;
  }
}
export function setTotalAttackFlatWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.totalAttackFlatWithGearA = value;
  }
}
export function setCritFlatWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.critFlatWithGearA = value;
  }
}
export function setCritPercentWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.critPercentWithGearA = value;
  }
}
export function setCritDamageWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsState;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.critDamageWithGearA = value;
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
