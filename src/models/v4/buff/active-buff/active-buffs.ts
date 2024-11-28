import type { BuffId } from "../../../../definitions/types/buff/buff-ability-definition";
import type { HasActiveBuffs } from "../has-active-buffs";
import type { ActiveBuff } from "./active-buff";

/** All currently active buffs */
export class ActiveBuffs {
  public constructor(private readonly source: HasActiveBuffs) {}

  public get items(): ActiveBuff[] {
    return this.source.getActiveBuffs();
  }

  public hasBuff(id: BuffId) {
    return this.items.some((currentBuff) => currentBuff.buffId === id);
  }

  public getBaseAttackBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.baseAttackBuffs);
  }

  public getAttackPercentBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.attackPercentBuffs);
  }

  public getElementalDamageBuffs() {
    return this.items.flatMap(
      (currentBuff) => currentBuff.elementalDamageBuffs,
    );
  }

  public getFinalDamageBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.finalDamageBuffs);
  }

  public getCritRateBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.critRateBuffs);
  }

  public getCritDamageBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.critDamageBuffs);
  }
}
