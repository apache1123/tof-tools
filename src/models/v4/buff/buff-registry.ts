import { Registry } from '../registry/registry';
import type { ActiveBuff } from './active-buff/active-buff';
import type { BuffAbility } from './buff-ability';

export class BuffRegistry extends Registry<BuffAbility> {
  public getActiveBuffs(): ActiveBuff[] {
    return this.items.flatMap((buffAbility) => buffAbility.getActiveBuffs());
  }
}
