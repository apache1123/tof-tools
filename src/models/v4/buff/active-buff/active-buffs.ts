import type { BuffId } from '../../../../definitions/types/buff/buff-ability';
import type { BuffRegistry } from '../buff-registry';
import type { ActiveBuff } from './active-buff';

/** All currently active buffs at the current tick */
export class ActiveBuffs {
  public constructor(private readonly buffRegistry: BuffRegistry) {}

  public get items(): ActiveBuff[] {
    return this.buffRegistry.getActiveBuffs();
  }

  public hasBuff(id: BuffId) {
    return this.items.some((currentBuff) => currentBuff.buffId === id);
  }

  public getBaseAttackBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.baseAttackBuffs);
  }

  public getAttackBuffs() {
    return this.items.flatMap((currentBuff) => currentBuff.attackBuffs);
  }

  public getElementalDamageBuffs() {
    return this.items.flatMap(
      (currentBuff) => currentBuff.elementalDamageBuffs
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
