import type { Meta, StoryObj } from "@storybook/react";

import { MatrixTypeToggle } from "./MatrixTypeToggle";

const meta: Meta<typeof MatrixTypeToggle> = {
  title: "Matrix Type Toggle",
  component: MatrixTypeToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixTypeToggle>;

export const Exclusive: Story = {
  args: {
    values: ["mind"],
    exclusive: true,
  },
};

export const Multiple: Story = {
  args: {
    values: ["mind", "memory"],
    exclusive: false,
  },
};

export const ExclusiveEnforceAtLeastOne: Story = {
  args: {
    values: ["mind"],
    exclusive: true,
    enforceAtLeastOne: true,
  },
};

export const MultipleEnforceAtLeastOne: Story = {
  args: {
    values: ["mind"],
    exclusive: false,
    enforceAtLeastOne: true,
  },
};
