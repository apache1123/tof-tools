import type { Meta, StoryObj } from "@storybook/react";

import { BuffLine } from "./BuffLine";

const meta: Meta<typeof BuffLine> = {
  component: BuffLine,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BuffLine>;

export const Integer: Story = {
  args: {
    displayName: "Buff name",
    element: "Flame",
    totalValue: 100,
    isPercentageValue: false,
  },
};

export const Percentage: Story = {
  args: {
    displayName: "Buff name",
    element: "Flame",
    totalValue: 0.23,
    isPercentageValue: true,
  },
};
