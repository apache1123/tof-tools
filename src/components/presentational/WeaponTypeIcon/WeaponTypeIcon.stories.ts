import type { Meta, StoryObj } from "@storybook/react";

import { WeaponTypeIcon } from "./WeaponTypeIcon";

const meta: Meta<typeof WeaponTypeIcon> = {
  title: "Weapon Type Icon",
  component: WeaponTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponTypeIcon>;

export const Initial: Story = { args: { type: "DPS" } };
