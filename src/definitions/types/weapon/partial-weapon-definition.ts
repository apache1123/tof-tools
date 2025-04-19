import type { Overwrite } from "utility-types";

import type { PartialWeaponBuffAbilityDefinition } from "./partial-weapon-buff-ability-definition";
import type { WeaponDefinition } from "./weapon-definition";

export type PartialWeaponDefinition = Overwrite<
  WeaponDefinition,
  {
    buffs: PartialWeaponBuffAbilityDefinition[];
  }
>;
