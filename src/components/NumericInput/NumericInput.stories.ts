import type { Meta, StoryObj } from '@storybook/react';
import { NumericInput } from './NumericInput';

const meta: Meta<typeof NumericInput> = {
  title: 'Numeric Input',
  component: NumericInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumericInput>;

export const Initial: Story = {
  args: {
    value: 69,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
