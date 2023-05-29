import type { Meta, StoryObj } from '@storybook/react';
import { StatLine } from './StatLine';
import { StatType } from '../../types';
import statDefinitions from '../../../data/stat-definitions';

const meta: Meta<typeof StatLine> = {
  title: 'Stat Line',
  component: StatLine,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatLine>;

const attackStatDefinition = statDefinitions.find(
  (definition) => definition.type === StatType.Attack
);

export const FlatStat: Story = {
  args: {
    stat: {
      definition: attackStatDefinition,
      value: 69,
    },
  },
};

export const FlatStatEditable: Story = {
  args: {
    stat: {
      definition: attackStatDefinition,
      value: 69,
    },
    editable: true,
  },
};

const attackPercentStatDefinition = statDefinitions.find(
  (definition) => definition.isPercentageBased
);
export const PercentageStat: Story = {
  args: {
    stat: {
      definition: attackPercentStatDefinition,
      value: 0.0692,
    },
  },
};

export const PercentageStatEditable: Story = {
  args: {
    stat: {
      definition: attackPercentStatDefinition,
      value: 0.0692,
    },
    editable: true,
  },
};
