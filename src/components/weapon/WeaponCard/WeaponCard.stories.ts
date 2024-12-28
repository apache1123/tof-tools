import type { Meta, StoryObj } from "@storybook/react";

import { exampleWeapon } from "../../__fixtures__/weapon";
import { WeaponCard } from "./WeaponCard";

const meta: Meta<typeof WeaponCard> = {
  component: WeaponCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponCard>;

const weapon = exampleWeapon;

export const Default: Story = {
  args: { weapon },
};

export const CustomWidth: Story = {
  args: { weapon, sx: { width: 380 } },
};
