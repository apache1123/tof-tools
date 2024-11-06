import type { WeaponName } from "../definitions/weapons/weapon-definitions";
import type {
  WeaponAttackPercentBuffDefinition,
  WeaponBuffDefinition,
} from "./weapon-buff-definition";

export interface WeaponBuff
  extends Pick<
    WeaponBuffDefinition,
    "id" | "displayName" | "description" | "value" | "isActivePassively"
  > {
  weaponId: WeaponName;
  weaponDisplayName: string;
}

export interface WeaponAttackPercentBuff
  extends WeaponBuff,
    Pick<WeaponAttackPercentBuffDefinition, "elementalTypes"> {}

export type WeaponCritRateBuff = WeaponBuff;
export type WeaponCritDamageBuff = WeaponBuff;
