import type { Meta, StoryObj } from "@storybook/react";

import { NumericCompareString } from "./NumericCompareString";

const meta: Meta<typeof NumericCompareString> = {
  component: NumericCompareString,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumericCompareString>;

export const IntegerHigher: Story = {
  args: {
    value: 69,
    otherValue: 50,
    variant: "integer",
  },
};

export const IntegerLower: Story = {
  args: {
    value: 69,
    otherValue: 420,
    variant: "integer",
  },
};

export const Percentage2dpHigher: Story = {
  args: {
    value: 0.6969,
    otherValue: 0.5,
    variant: "percentage2dp",
  },
};

export const Percentage2dpLower: Story = {
  args: {
    value: 0.69,
    otherValue: 0.9696,
    variant: "percentage2dp",
  },
};
