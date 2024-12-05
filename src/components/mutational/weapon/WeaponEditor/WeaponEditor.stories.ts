import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Character } from "../../../../models/character/character";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponEditor } from "./WeaponEditor";

const meta: Meta<typeof WeaponEditor> = {
  title: "Weapon Editor",
  component: WeaponEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditor>;

const weapon = proxy(
  new Weapon(weaponDefinitions.byId["King"], new Character()),
);
export const Default: Story = {
  args: { weaponState: weapon },
};
