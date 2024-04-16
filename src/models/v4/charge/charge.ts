import { fullCharge } from '../../../constants/resources';
import type { AttackAction } from '../attack/attack-action';
import { Resource } from '../resource/resource';
import { TimePeriod } from '../time-period';

export class Charge extends Resource {
  /** Has at least one full charge. This is different from having the max amount of charge. (Having the max amount of charge means you have two full charges) */
  public hasFullCharge(time: number) {
    return this.getCumulatedAmount(time) - fullCharge >= 0;
  }

  public getNumOfFullCharges(time: number): number {
    return Math.trunc(this.getCumulatedAmount(time) / fullCharge);
  }

  /** Adjust the charge amount based on an attack
   * @returns true if a new full charge is achieved as a result of charge being added
   */
  public adjustCharge(attackAction: AttackAction): boolean {
    const { type, startTime, endTime, charge } = attackAction;

    if (type === 'discharge') {
      this.deductOneFullCharge(startTime, endTime);
      return false;
    }

    return this.addChargeAction(charge, startTime, endTime);
  }

  /** Adds a number of charge units at a point of time. Charges must be added chronologically.
   * @returns true if a new full charge is achieved as a result of the charge being added
   */
  public addChargeAction(
    chargeValue: number,
    startTime: number,
    endTime: number
  ): boolean {
    const oldNumOfFullCharges = this.getNumOfFullCharges(startTime);

    this.addResourceAction(new TimePeriod(startTime, endTime), chargeValue);
    const newNumOfFullCharges = this.getNumOfFullCharges(endTime);

    if (newNumOfFullCharges > oldNumOfFullCharges) {
      return true;
    }

    return false;
  }

  public deductOneFullCharge(startTime: number, endTime: number) {
    if (!this.hasFullCharge)
      throw new Error(
        'Cannot deduct a full charge when there is no full charge'
      );

    this.addResourceAction(new TimePeriod(startTime, endTime), -fullCharge);
  }
}
