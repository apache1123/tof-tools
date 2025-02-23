import type { Gear } from "./gear";
import type { GearType } from "./gear-type";

export class GearSlot {
  public constructor(acceptsType: GearType) {
    this.acceptsType = acceptsType;
  }

  public readonly acceptsType: GearType;
  private _gear: Gear | undefined;

  public get gear() {
    return this._gear;
  }
  public set gear(value: Gear | undefined) {
    if (value && value.type.id !== this.acceptsType.id) {
      throw new Error(
        `Gear of type ${value.type.id} cannot be set in a slot that accepts ${this.acceptsType.id}`,
      );
    }

    this._gear = value;
  }
}
