import type { Meta, StoryObj } from '@storybook/react';

import { MatrixIcon } from './MatrixIcon';

const meta: Meta<typeof MatrixIcon> = {
  title: 'Matrix Icon',
  component: MatrixIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MatrixIcon>;

export const Empty: Story = {
  args: {
    matrixNames: [],
  },
};

export const One: Story = {
  args: {
    matrixNames: ['Alyss 4pc'],
  },
};

export const Two: Story = {
  args: {
    matrixNames: ['Alyss 2pc', 'Annabella 2pc'],
  },
};
