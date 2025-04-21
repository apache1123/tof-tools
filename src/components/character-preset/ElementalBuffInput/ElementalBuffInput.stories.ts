import type { Meta, StoryObj } from "@storybook/react";

import { ElementalBuffInput } from "./ElementalBuffInput";

const meta: Meta<typeof ElementalBuffInput> = {
  component: ElementalBuffInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ElementalBuffInput>;

export const Default: Story = {
  args: {},
};

export const BuffProp: Story = {
  args: {
    buff: {
      elementalTypes: ["Flame"],
      value: 10,
    },
  },
};
