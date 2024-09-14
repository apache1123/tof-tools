import { Buff } from './buff';

export class CritRateBuff extends Buff {
  public override canApplyTo(): boolean {
    return true;
  }
}
