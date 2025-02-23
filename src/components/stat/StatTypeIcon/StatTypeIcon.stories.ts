import type { Meta, StoryObj } from "@storybook/react";

import { StatTypeIcon } from "./StatTypeIcon";

const meta: Meta<typeof StatTypeIcon> = {
  component: StatTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatTypeIcon>;

export const Unknown: Story = {
  args: {
    role: undefined,
  },
};

export const Initial: Story = {
  args: {
    role: "Attack",
    element: "Altered",
  },
};
