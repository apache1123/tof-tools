import type { Meta, StoryObj } from "@storybook/react";

import { GearStarsSelector } from "./GearStarsSelector";

const meta: Meta<typeof GearStarsSelector> = {
  title: "Gear Stars Selector",
  component: GearStarsSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearStarsSelector>;

export const Initial: Story = {};

export const ReadOnly: Story = {
  args: {
    stars: 2,
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    stars: 3,
    size: "small",
  },
};
