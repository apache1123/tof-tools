import { Registry } from "../registry/registry";
import type { AttackAbility } from "./attack-ability";

export class AttackRegistry extends Registry<AttackAbility> {
  public hasOngoingForegroundAttack() {
    return this.items.some((attack) => attack.isOngoingForegroundAttack());
  }
}
