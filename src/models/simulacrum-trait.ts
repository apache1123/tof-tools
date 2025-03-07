import type { SimulacrumId } from "../definitions/simulacra/simulacrum-id";
import type { BuffAbilityDefinition } from "../definitions/types/buff/buff-ability-definition";

export type SimulacrumTraitId = SimulacrumId;

export interface SimulacrumTrait {
  id: SimulacrumTraitId;
  displayName: string;
  buffs: BuffAbilityDefinition[];

  remarks?: string;
}
