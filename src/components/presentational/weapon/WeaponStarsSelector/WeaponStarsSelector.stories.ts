import type { Meta, StoryObj } from "@storybook/react";

import { WeaponStarsSelector } from "./WeaponStarsSelector";

const meta: Meta<typeof WeaponStarsSelector> = {
  title: "Weapon Stars Selector",
  component: WeaponStarsSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponStarsSelector>;

export const Empty: Story = {
  args: {
    stars: 0,
  },
};

export const Preselected: Story = {
  args: {
    stars: 4,
  },
};
