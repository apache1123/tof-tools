import type { Meta, StoryObj } from "@storybook/react";

import { exampleMatrixSlots } from "../../__fixtures__/matrix-slot";
import { MatrixSlotCardList } from "./MatrixSlotCardList";

const meta: Meta<typeof MatrixSlotCardList> = {
  component: MatrixSlotCardList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotCardList>;

export const Default: Story = {
  args: { matrixSlots: exampleMatrixSlots.getSlots() },
};
