import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../models/weapon/weapon";
import { exampleCharacterId } from "./character";
import { exampleMatrixSlots } from "./matrix-slot";

export const exampleWeaponId = "weaponId";

export const exampleWeapon = new Weapon(
  getWeaponDefinition("King"),
  exampleCharacterId,
  exampleWeaponId,
  exampleMatrixSlots,
);
exampleWeapon.stars = 2;
