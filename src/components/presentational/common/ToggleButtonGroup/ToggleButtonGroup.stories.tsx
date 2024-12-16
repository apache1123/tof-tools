import { ToggleButton } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButtonGroup } from "./ToggleButtonGroup";

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

function Children() {
  return [1, 2, 3, 4].map((value) => (
    <ToggleButton key={value} value={value}>
      {value}
    </ToggleButton>
  ));
}

export const Exclusive: Story = {
  args: {
    value: [1],
    exclusive: true,
    children: <Children />,
  },
};

export const Multiple: Story = {
  args: {
    value: [1, 2],
    exclusive: false,
    children: <Children />,
  },
};

export const ExclusiveEnforceAtLeastOne: Story = {
  args: {
    value: [1],
    exclusive: true,
    enforceAtLeastOne: true,
    children: <Children />,
  },
};

export const MultipleEnforceAtLeastOne: Story = {
  args: {
    value: [1],
    exclusive: false,
    enforceAtLeastOne: true,
    children: <Children />,
  },
};
