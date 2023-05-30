import type { Meta, StoryObj } from '@storybook/react';
import { StatSelector } from './StatSelector';
import { Stat } from '../../types';

const meta: Meta<typeof StatSelector> = {
  title: 'Stat Selector',
  component: StatSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatSelector>;

const stats = [
  { definition: { name: 'HP' } },
  { definition: { name: 'Attack' } },
  { definition: { name: 'Resistance' } },
] as Stat[];

export const Empty: Story = {
  args: {
    stats,
  },
};

export const Preselected: Story = {
  args: {
    stats,
    value: stats.at(0),
  },
};
