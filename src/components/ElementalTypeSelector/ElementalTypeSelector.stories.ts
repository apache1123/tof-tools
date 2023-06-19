import type { Meta, StoryObj } from '@storybook/react';

import { ElementalTypeSelector } from './ElementalTypeSelector';

const meta: Meta<typeof ElementalTypeSelector> = {
  title: 'Elemental Type Selector',
  component: ElementalTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ElementalTypeSelector>;

export const Initial: Story = {};
