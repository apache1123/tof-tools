import type { ActiveBuff } from "../buff/active-buff/active-buff";
import type { HasActiveBuffs } from "../buff/has-active-buffs";
import { Repository } from "../repository/repository";
import type { GearCompareBuffAbility } from "./gear-compare-buff-ability";

export class GearCompareBuffAbilities
  extends Repository<GearCompareBuffAbility>
  implements HasActiveBuffs
{
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
