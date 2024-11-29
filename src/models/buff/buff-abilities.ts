import { Repository } from "../repository/repository";
import type { ActiveBuff } from "./active-buff/active-buff";
import type { BuffAbility } from "./buff-ability";
import type { HasActiveBuffs } from "./has-active-buffs";

export class BuffAbilities
  extends Repository<BuffAbility>
  implements HasActiveBuffs
{
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
