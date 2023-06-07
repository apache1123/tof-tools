import type { Meta, StoryObj } from '@storybook/react';
import { StatTypeSelector } from './StatSelector';
import { StatType } from '../../models/stat-type';

const meta: Meta<typeof StatTypeSelector> = {
  title: 'Stat Type Selector',
  component: StatTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatTypeSelector>;

const statTypes = [
  { name: 'HP' },
  { name: 'Attack' },
  { name: 'Resistance' },
] as StatType[];

export const Empty: Story = {
  args: {
    possibleStatTypes: statTypes,
  },
};

export const Preselected: Story = {
  args: {
    possibleStatTypes: statTypes,
    selectedStatType: statTypes.at(0),
  },
};
