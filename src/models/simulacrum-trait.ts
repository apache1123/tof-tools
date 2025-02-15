import type { SimulacrumId } from "../definitions/simulacra/simulacrum-id";
import type { BuffAbilityDefinition } from "../definitions/types/buff/buff-ability-definition";

export interface SimulacrumTrait {
  id: SimulacrumId;
  displayName: string;
  buffs: BuffAbilityDefinition[];

  remarks?: string;
}
