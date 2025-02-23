import type { Meta, StoryObj } from "@storybook/react";

import { StatDisplay } from "./StatDisplay";

const meta: Meta<typeof StatDisplay> = {
  component: StatDisplay,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof StatDisplay>;

export const Default: Story = {
  args: {
    role: "Attack",
    element: "Frost",
    displayName: "Frost Attack",
    value: 2000,
  },
};

export const Percentage: Story = {
  args: {
    role: "Attack %",
    element: "Frost",
    displayName: "Frost Attack",
    value: 0.03,
    isPercentageBased: true,
  },
};
