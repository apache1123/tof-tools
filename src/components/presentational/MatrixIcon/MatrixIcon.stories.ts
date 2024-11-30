import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../definitions/matrices/matrix-definitions";
import { MatrixIcon } from "./MatrixIcon";

const meta: Meta<typeof MatrixIcon> = {
  title: "Matrix Icon",
  component: MatrixIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixIcon>;

const { id, displayName } = getMatrixDefinition("Alyss");
export const Default: Story = {
  args: {
    matrixDefinitionId: id,
    displayName,
  },
};
