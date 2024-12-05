import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Character } from "../../../../models/character/character";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponEditorModal } from "./WeaponEditorModal";

const meta: Meta<typeof WeaponEditorModal> = {
  title: "Weapon Editor Modal",
  component: WeaponEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditorModal>;

const weapon = proxy(
  new Weapon(weaponDefinitions.byId["King"], new Character()),
);
export const Default: Story = {
  args: { weaponState: weapon },
};
