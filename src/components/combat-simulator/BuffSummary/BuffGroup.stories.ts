import type { Meta, StoryObj } from "@storybook/react";

import { BuffGroup } from "./BuffGroup";

const meta: Meta<typeof BuffGroup> = {
  component: BuffGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BuffGroup>;

export const Integer: Story = {
  args: {
    title: "Attack % buffs",
    element: "Flame",
    totalValue: 100,
    isPercentageValue: false,
  },
};

export const Percentage: Story = {
  args: {
    title: "Attack % buffs",
    element: "Flame",
    totalValue: 0.23,
    isPercentageValue: true,
  },
};
