import type { Meta, StoryObj } from "@storybook/react";

import { DeleteButtonWithConfirm } from "./DeleteButtonWithConfirm";

const meta: Meta<typeof DeleteButtonWithConfirm> = {
  component: DeleteButtonWithConfirm,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DeleteButtonWithConfirm>;

export const Default: Story = {
  args: { itemName: "Item Name" },
};
