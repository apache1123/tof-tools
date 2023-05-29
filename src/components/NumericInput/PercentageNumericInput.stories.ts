import type { Meta, StoryObj } from '@storybook/react';
import { PercentageNumericInput } from './PercentageNumericInput';

const meta: Meta<typeof PercentageNumericInput> = {
  title: 'Percentage Numeric Input',
  component: PercentageNumericInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PercentageNumericInput>;

export const Initial: Story = {
  args: {
    value: 0.0692,
  },
};
