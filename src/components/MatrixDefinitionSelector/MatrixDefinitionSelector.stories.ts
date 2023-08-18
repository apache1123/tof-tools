import type { Meta, StoryObj } from '@storybook/react';

import {
  matrix2pcDefinitions,
  matrix4pcDefinitions,
  MatrixName,
} from '../../constants/matrix-definitions';
import { MatrixDefinitionSelector } from './MatrixDefinitionSelector';

const meta: Meta<typeof MatrixDefinitionSelector> = {
  title: 'Matrix Definition Selector',
  component: MatrixDefinitionSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MatrixDefinitionSelector>;

export const Empty: Story = {
  args: {
    selectedDefinitions: {
      selected4pcDefinition: undefined,
      selected2pcDefinition1: undefined,
      selected2pcDefinition2: undefined,
    },
  },
};

export const Preselected2pcSingle: Story = {
  args: {
    selectedDefinitions: {
      selected4pcDefinition: undefined,
      selected2pcDefinition1: undefined,
      selected2pcDefinition2: matrix2pcDefinitions.byId[MatrixName.Fenrir],
    },
  },
};

export const Preselected2pcBoth: Story = {
  args: {
    selectedDefinitions: {
      selected4pcDefinition: undefined,
      selected2pcDefinition1: matrix2pcDefinitions.byId[MatrixName.Cocoritter],
      selected2pcDefinition2: matrix2pcDefinitions.byId[MatrixName.Fenrir],
    },
  },
};

export const Preselected4pc: Story = {
  args: {
    selectedDefinitions: {
      selected4pcDefinition: matrix4pcDefinitions.byId[MatrixName.Fenrir],
      selected2pcDefinition1: undefined,
      selected2pcDefinition2: matrix2pcDefinitions.byId[MatrixName.Fenrir],
    },
  },
};
