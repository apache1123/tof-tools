import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { NewMatrixModal } from "./NewMatrixModal";

const meta: Meta<typeof NewMatrixModal> = {
  component: NewMatrixModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NewMatrixModal>;

export const Default: Story = {
  args: { definition: getMatrixDefinition("Alyss") },
};
