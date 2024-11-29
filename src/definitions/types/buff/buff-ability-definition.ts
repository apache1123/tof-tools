import type { AbilityId } from "../../../models/ability/ability-id";
import type { MiscellaneousBuff } from "../../../models/buff/miscellaneous-buff";
import type { AbilityDefinition } from "../ability/ability-definition";
import type { AttackPercentBuffDefinition } from "./attack-percent-buff-definition";
import type { BaseAttackBuffDefinition } from "./base-attack-buff-definition";
import type { CritDamageBuffDefinition } from "./crit-damage-buff-definition";
import type { CritRateBuffDefinition } from "./crit-rate-buff-definition";
import type { ElementalDamageBuffDefinition } from "./elemental-damage-buff-definition";
import type { FinalDamageBuffDefinition } from "./final-damage-buff-definition";

export type BuffId = AbilityId;

export interface BuffAbilityDefinition extends AbilityDefinition {
  id: BuffId;
  maxStacks: number;

  baseAttackBuffs?: BaseAttackBuffDefinition[];
  attackBuffs?: AttackPercentBuffDefinition[];
  elementalDamageBuffs?: ElementalDamageBuffDefinition[];
  finalDamageBuffs?: FinalDamageBuffDefinition[];
  critRateBuffs?: CritRateBuffDefinition[];
  critDamageBuffs?: CritDamageBuffDefinition[];
  miscBuff?: MiscellaneousBuff;
}
