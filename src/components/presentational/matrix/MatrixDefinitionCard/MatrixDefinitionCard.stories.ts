import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionCard } from "./MatrixDefinitionCard";

const meta: Meta<typeof MatrixDefinitionCard> = {
  title: "Matrix Definition Card",
  component: MatrixDefinitionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixDefinitionCard>;

const { id, displayName } = getMatrixDefinition("Alyss");
export const Default: Story = {
  args: {
    definitionId: id,
    displayName,
  },
};
