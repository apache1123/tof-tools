import type { Meta, StoryObj } from "@storybook/react";

import { exampleMatrixPreset } from "../../../__fixtures__/matrix-preset";
import { MatrixPresetCard } from "./MatrixPresetCard";

const meta: Meta<typeof MatrixPresetCard> = {
  component: MatrixPresetCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixPresetCard>;

export const Default: Story = {
  args: { matrixSlots: exampleMatrixPreset.matrixSlots.getSlots() },
};
