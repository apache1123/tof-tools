import type { ElementalType } from "../../../definitions/elemental-type";
import type { WeaponId } from "../../weapon/weapon";
import type { Message } from "../message";

export interface ActiveWeaponChangedMessage extends Message {
  id: WeaponId;
  damageElement: ElementalType;
}
