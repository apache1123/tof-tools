import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { Message } from "../message";

export interface ActiveWeaponChangedMessage extends Message {
  id: WeaponName;
  damageElement: WeaponElementalType;
}
