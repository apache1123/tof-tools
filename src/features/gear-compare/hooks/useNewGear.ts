import { useProxy } from "valtio/utils";

import { gearCompareState } from "../../../states/gear-compare/gear-compare-state";
import { useRepositoryItem } from "../../common/useRepositoryItem";

export function useNewGear() {
  const { newGearId } = useProxy(gearCompareState);

  const { item, itemProxy } = useRepositoryItem("gears", (repository) =>
    newGearId ? repository.find(newGearId) : undefined,
  );

  return {
    newGear: item,
    newGearProxy: itemProxy,
  };
}
