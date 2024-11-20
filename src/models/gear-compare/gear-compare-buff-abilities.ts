import type { ActiveBuff } from "../v4/buff/active-buff/active-buff";
import type { HasActiveBuffs } from "../v4/buff/has-active-buffs";
import { Registry } from "../v4/registry/registry";
import type { GearCompareBuffAbility } from "./gear-compare-buff-ability";

export class GearCompareBuffAbilities
  extends Registry<GearCompareBuffAbility>
  implements HasActiveBuffs
{
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
