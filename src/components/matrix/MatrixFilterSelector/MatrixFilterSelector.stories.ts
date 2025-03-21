import type { Meta, StoryObj } from "@storybook/react";

import { MatrixFilterSelector } from "./MatrixFilterSelector";

const meta: Meta<typeof MatrixFilterSelector> = {
  component: MatrixFilterSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixFilterSelector>;

export const Default: Story = {
  args: { filter: { definitionIds: ["Alyss"] } },
};
