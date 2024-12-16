import type { Meta, StoryObj } from "@storybook/react";

import { matrixSetDefinitionsLookup } from "../../../../definitions/matrices/matrix-set-definitions";
import { MatrixSet4pcDefinitionSelector } from "./MatrixSetDefinitionSelector";

const meta: Meta<typeof MatrixSet4pcDefinitionSelector> = {
  component: MatrixSet4pcDefinitionSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSet4pcDefinitionSelector>;

export const Empty: Story = {
  args: {
    selectedMatrixSetDefinition: undefined,
  },
};

export const Preselected: Story = {
  args: {
    selectedMatrixSetDefinition: matrixSetDefinitionsLookup["Fenrir 4pc"],
  },
};
