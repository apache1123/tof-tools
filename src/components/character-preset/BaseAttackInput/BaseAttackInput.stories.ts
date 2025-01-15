import type { Meta, StoryObj } from "@storybook/react";

import { BaseAttackInput } from "./BaseAttackInput";

const meta: Meta<typeof BaseAttackInput> = {
  component: BaseAttackInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof BaseAttackInput>;

export const Default: Story = {
  args: { element: "Frost", value: 1000 },
};

export const Blank: Story = {
  args: { element: "Frost", value: undefined },
};
