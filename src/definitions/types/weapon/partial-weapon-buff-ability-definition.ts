import type { Subtract } from "utility-types";

import type { PartialBuffAbilityDefinition } from "../buff/partial-buff-ability-definition";
import type { WeaponBuffAbilityDefinition } from "./weapon-buff-ability-definition";

export type PartialWeaponBuffAbilityDefinition = PartialBuffAbilityDefinition &
  Subtract<WeaponBuffAbilityDefinition, PartialBuffAbilityDefinition>;
