import type { Meta, StoryObj } from "@storybook/react";

import { exampleMatrixSlots } from "../../__fixtures__/matrix-slot";
import { MatrixSlotIconList } from "./MatrixSlotIconList";

const meta: Meta<typeof MatrixSlotIconList> = {
  component: MatrixSlotIconList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotIconList>;

export const Default: Story = {
  args: { matrixSlots: exampleMatrixSlots.getSlots() },
};
