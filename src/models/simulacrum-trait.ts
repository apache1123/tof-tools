import type { SimulacrumName } from "../definitions/simulacra/simulacrum-name";
import type { BuffAbilityDefinition } from "../definitions/types/buff/buff-ability-definition";

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  buffs: BuffAbilityDefinition[];

  remarks?: string;
}
