import type { ActiveBuff } from "../buff/active-buff/active-buff";
import type { HasActiveBuffs } from "../buff/has-active-buffs";
import { Registry } from "../registry/registry";
import type { GearCompareBuffAbility } from "./gear-compare-buff-ability";

export class GearCompareBuffAbilities
  extends Registry<GearCompareBuffAbility>
  implements HasActiveBuffs
{
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
