import { Buff } from "../buff";

export class CritDamageBuff extends Buff {
  public override canApplyTo(): boolean {
    return true;
  }
}
