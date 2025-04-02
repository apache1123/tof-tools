import type { Meta, StoryObj } from "@storybook/react";

import { NumericInput } from "./NumericInput";

const meta: Meta<typeof NumericInput> = {
  component: NumericInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumericInput>;

export const Default: Story = {
  args: {
    value: 69,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Minimum: Story = {
  args: {
    value: 1,
    min: 10,
  },
};
