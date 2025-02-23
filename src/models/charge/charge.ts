import { fullCharge } from "../../definitions/resources";
import { Resource } from "../resource/resource";

export class Charge extends Resource {
  /** Has full charge at the start of the current tick i.e. discharge available */
  public hasFullCharge() {
    return this.getCumulatedAmount() >= fullCharge;
  }
}
