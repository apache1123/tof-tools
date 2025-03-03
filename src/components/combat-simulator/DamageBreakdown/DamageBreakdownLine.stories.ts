import type { Meta, StoryObj } from "@storybook/react";

import { DamageBreakdownLine } from "./DamageBreakdownLine";

const meta: Meta<typeof DamageBreakdownLine> = {
  component: DamageBreakdownLine,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DamageBreakdownLine>;

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
