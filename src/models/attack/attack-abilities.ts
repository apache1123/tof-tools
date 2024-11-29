import { Repository } from "../repository/repository";
import type { AttackAbility } from "./attack-ability";

export class AttackAbilities extends Repository<AttackAbility> {
  public hasOngoingForegroundAttack() {
    return this.items.some((attack) => attack.isOngoingForegroundAttack());
  }
}
