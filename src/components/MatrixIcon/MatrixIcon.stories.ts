import type { Meta, StoryObj } from '@storybook/react';

import { getMatrixSetDefinition } from '../../models/matrix-set-definition';
import { MatrixIcon } from './MatrixIcon';

const meta: Meta<typeof MatrixIcon> = {
  title: 'Matrix Icon',
  component: MatrixIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MatrixIcon>;

const { id, displayName } = getMatrixSetDefinition('Alyss 4pc');
export const Default: Story = {
  args: {
    matrixName: id,
    displayName,
  },
};
