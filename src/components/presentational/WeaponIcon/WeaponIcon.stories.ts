import type { Meta, StoryObj } from "@storybook/react";

import { WeaponIcon } from "./WeaponIcon";

const meta: Meta<typeof WeaponIcon> = {
  title: "Weapon Icon",
  component: WeaponIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponIcon>;

export const Initial: Story = {
  args: {
    weaponName: "Nola",
    size: 100,
    elementalIcon: "Flame-Physical",
  },
};
