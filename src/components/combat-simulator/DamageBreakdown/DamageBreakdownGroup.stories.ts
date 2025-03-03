import type { Meta, StoryObj } from "@storybook/react";

import { DamageBreakdownGroup } from "./DamageBreakdownGroup";

const meta: Meta<typeof DamageBreakdownGroup> = {
  component: DamageBreakdownGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DamageBreakdownGroup>;

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
