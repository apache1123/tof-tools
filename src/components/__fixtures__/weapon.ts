import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../models/weapon/weapon";
import { exampleMatrixSlots } from "./matrix-slot";

export const exampleWeapon = new Weapon(
  getWeaponDefinition("King"),
  exampleMatrixSlots,
);
exampleWeapon.stars = 2;
