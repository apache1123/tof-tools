import type { Meta, StoryObj } from "@storybook/react";

import { MatrixFilterEditor } from "./MatrixFilterEditor";

const meta: Meta<typeof MatrixFilterEditor> = {
  component: MatrixFilterEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixFilterEditor>;

export const Default: Story = {
  args: { filter: { definitionIds: ["Alyss"] } },
};
