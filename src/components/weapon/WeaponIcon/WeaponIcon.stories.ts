import type { Meta, StoryObj } from "@storybook/react";

import { WeaponIcon } from "./WeaponIcon";

const meta: Meta<typeof WeaponIcon> = {
  component: WeaponIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponIcon>;

export const Initial: Story = {
  args: {
    weaponId: "King",
    size: 100,
    elementalIcon: "Flame-Physical",
    weaponType: "DPS",
  },
};

export const NolaShouldUseBaseNolaIcon: Story = {
  args: {
    weaponId: "Nola (Flame-Physical)",
    iconWeaponId: "Nola",
    size: 100,
    elementalIcon: "Flame-Physical",
    weaponType: "DPS",
  },
};
