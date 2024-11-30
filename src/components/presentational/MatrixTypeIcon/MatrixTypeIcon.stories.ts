import type { Meta, StoryObj } from "@storybook/react";

import { MatrixTypeIcon } from "./MatrixTypeIcon";

const meta: Meta<typeof MatrixTypeIcon> = {
  title: "Matrix Type Icon",
  component: MatrixTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixTypeIcon>;

export const Default: Story = {
  args: { id: "mind" },
};
