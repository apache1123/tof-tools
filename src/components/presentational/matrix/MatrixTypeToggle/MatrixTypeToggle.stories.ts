import type { Meta, StoryObj } from "@storybook/react";

import { MatrixTypeToggle } from "./MatrixTypeToggle";

const meta: Meta<typeof MatrixTypeToggle> = {
  title: "Matrix Type Toggle",
  component: MatrixTypeToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixTypeToggle>;

export const Default: Story = { args: { values: ["mind"] } };
