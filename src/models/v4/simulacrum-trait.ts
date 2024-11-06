import type { SimulacrumName } from "../../definitions/simulacrum-traits";
import type { BuffAbility } from "../../definitions/types/buff/buff-ability";

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  buffs: BuffAbility[];

  remarks?: string;
}
