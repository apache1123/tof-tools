import type { ActiveBuff } from "../v4/buff/active-buff/active-buff";
import type { HasActiveBuffs } from "../v4/buff/has-active-buffs";
import { Repository } from "../v4/repository/repository";
import type { GearCompareBuffAbility } from "./gear-compare-buff-ability";

export class GearCompareBuffAbilities
  extends Repository<GearCompareBuffAbility>
  implements HasActiveBuffs
{
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
