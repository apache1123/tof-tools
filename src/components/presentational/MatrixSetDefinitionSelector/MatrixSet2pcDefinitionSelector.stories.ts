import type { Meta, StoryObj } from "@storybook/react";

import { matrixSetDefinitionsLookup } from "../../../definitions/matrices/matrix-set-definitions";
import { MatrixSet2pcDefinitionSelector } from "./MatrixSetDefinitionSelector";

const meta: Meta<typeof MatrixSet2pcDefinitionSelector> = {
  title: "Matrix Set 2pc Definition Selector",
  component: MatrixSet2pcDefinitionSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSet2pcDefinitionSelector>;

export const Empty: Story = {
  args: {
    selectedMatrixSetDefinition: undefined,
  },
};

export const Preselected: Story = {
  args: {
    selectedMatrixSetDefinition: matrixSetDefinitionsLookup["Fenrir 2pc"],
  },
};
