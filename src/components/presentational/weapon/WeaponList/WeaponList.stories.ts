import type { Meta, StoryObj } from "@storybook/react";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponList } from "./WeaponList";

const meta: Meta<typeof WeaponList> = {
  component: WeaponList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponList>;

export const Default: Story = { args: { weapons: generateWeapons() } };

function generateWeapons() {
  const weapons = [];
  for (let i = 0; i < 5; i++) {
    const weapon = new Weapon(
      weaponDefinitions.byId[weaponDefinitions.allIds[i]],
      "characterId",
      undefined,
    );
    weapons.push(weapon);
  }
  return weapons;
}
