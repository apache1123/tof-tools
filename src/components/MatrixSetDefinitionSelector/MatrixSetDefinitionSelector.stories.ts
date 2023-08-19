import type { Meta, StoryObj } from '@storybook/react';

import {
  matrixSet2pcDefinitions,
} from '../../constants/matrix-set-definitions';
import { MatrixSetDefinitionSelector } from './MatrixSetDefinitionSelector';

const meta: Meta<typeof MatrixSetDefinitionSelector> = {
  title: 'Matrix Set Definition Selector',
  component: MatrixSetDefinitionSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MatrixSetDefinitionSelector>;

const options2pc = matrixSet2pcDefinitions.allIds.map(
  (id) => matrixSet2pcDefinitions.byId[id]
);

export const Empty: Story = {
  args: {
    options: options2pc,
    selectedMatrixSetDefinition: undefined,
  },
};

export const Preselected: Story = {
  args: {
    options: options2pc,
    selectedMatrixSetDefinition: options2pc[0],
  },
};
