import type { BuffId } from '../../../definitions/types/buff/buff-ability';
import type { ActiveBuff } from './active-buff';

export class ActiveBuffCollection {
  public constructor(private readonly activeBuffs: ActiveBuff[]) {}

  public get items() {
    return this.activeBuffs;
  }

  public hasBuff(id: BuffId) {
    return this.activeBuffs.some((activeBuff) => activeBuff.buffId === id);
  }

  public getBaseAttackBuffs() {
    return this.activeBuffs.flatMap((activeBuff) => activeBuff.baseAttackBuffs);
  }

  public getAttackBuffs() {
    return this.activeBuffs.flatMap((activeBuff) => activeBuff.attackBuffs);
  }

  public getElementalDamageBuffs() {
    return this.activeBuffs.flatMap(
      (activeBuff) => activeBuff.elementalDamageBuffs
    );
  }

  public getFinalDamageBuffs() {
    return this.activeBuffs.flatMap(
      (activeBuff) => activeBuff.finalDamageBuffs
    );
  }

  public getCritRateBuffs() {
    return this.activeBuffs.flatMap((activeBuff) => activeBuff.critRateBuffs);
  }

  public getCritDamageBuffs() {
    return this.activeBuffs.flatMap((activeBuff) => activeBuff.critDamageBuffs);
  }
}
