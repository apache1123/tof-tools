import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixPiecesIcon } from "./MatrixPiecesIcon";

const meta: Meta<typeof MatrixPiecesIcon> = {
  component: MatrixPiecesIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixPiecesIcon>;

const { id, displayName } = getMatrixDefinition("Alyss");
export const Default: Story = {
  args: {
    definitionId: id,
    displayName,
    pieces: 4,
  },
};
