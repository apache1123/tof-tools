import type { Meta, StoryObj } from '@storybook/react';
import { StatEditor } from './StatEditor';
import { Stat } from '../../types';
import statDefinitions from '../../../data/stat-definitions';
import { gearDefinitions } from '../../../data/gear-definitions';

const meta: Meta<typeof StatEditor> = {
  title: 'Stat Editor',
  component: StatEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatEditor>;

const availableStats = gearDefinitions.at(0).availableStatNames.map(
  (statName): Stat => ({
    definition: statDefinitions.find(
      (statDefinition) => statDefinition.name === statName
    ),
  })
);

const flatStat: Stat = {
  definition: statDefinitions.find(
    (statDefinition) => !statDefinition.isPercentageBased
  ),
  value: 69,
};
const percentStat: Stat = {
  definition: statDefinitions.find(
    (statDefinition) => statDefinition.isPercentageBased
  ),
  value: 0.0692,
};

export const FlatStat: Story = {
  args: {
    selectedStat: flatStat,
    availableStats,
  },
};

export const PercentageStat: Story = {
  args: {
    selectedStat: percentStat,
    availableStats,
  },
};

export const EmptyStatEditable: Story = {
  args: {
    selectedStat: null,
    availableStats,
  },
};
