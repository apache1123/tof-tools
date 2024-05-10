import { fullCharge } from "../../../constants/resources";
import { Resource } from "../resource/resource";

export class Charge extends Resource {
  /** Has full charge at a point of time i.e. discharge available */
  public hasFullCharge(time: number) {
    return this.getCumulatedAmount(time) >= fullCharge;
  }
}