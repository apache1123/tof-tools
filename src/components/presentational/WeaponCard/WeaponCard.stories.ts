import type { Meta, StoryObj } from "@storybook/react";

import { weaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../../models/weapon/weapon";
import { WeaponCard } from "./WeaponCard";

const meta: Meta<typeof WeaponCard> = {
  title: "Weapon Card",
  component: WeaponCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponCard>;

const weapon = new Weapon(weaponDefinitions.byId["King"], "characterId");
export const Default: Story = {
  args: { weapon },
};

export const CustomWidth: Story = {
  args: { weapon, sx: { width: 380 } },
};
