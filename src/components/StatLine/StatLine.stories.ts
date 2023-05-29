import type { Meta, StoryObj } from '@storybook/react';
import { StatLine } from './StatLine';
import { Stat, StatType } from '../../types';
import statDefinitions from '../../../data/stat-definitions';
import { gearDefinitions } from '../../../data/gear-definitions';

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
const attackPercentStatDefinition = statDefinitions.find(
  (definition) => definition.isPercentageBased
);

export const FlatStat: Story = {
  args: {
    stat: {
      definition: attackStatDefinition,
      value: 69,
    },
  },
};
export const PercentageStat: Story = {
  args: {
    stat: {
      definition: attackPercentStatDefinition,
      value: 0.0692,
    },
  },
};

const stats = gearDefinitions.at(0).availableStatNames.map(
  (statName): Stat => ({
    definition: statDefinitions.find(
      (statDefinition) => statDefinition.name === statName
    ),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let selectedStat;
const handleStatChange = (value: Stat) => {
  selectedStat = value;
};

let flatValue = 69;
let percentValue = 0.0692;
const handleFlatValueChange = (value: number) => (flatValue = value);
const handlePercentValueChange = (value: number) => (percentValue = value);

export const FlatStatEditable: Story = {
  args: {
    stat: {
      definition: attackStatDefinition,
      value: flatValue,
    },
    editable: {
      enabled: true,
      availableStats: stats,
      onStatChange: handleStatChange,
      onValueChange: handleFlatValueChange,
    },
  },
};

export const PercentageStatEditable: Story = {
  args: {
    stat: {
      definition: attackPercentStatDefinition,
      value: percentValue,
    },
    editable: {
      enabled: true,
      availableStats: stats,
      onStatChange: handleStatChange,
      onValueChange: handlePercentValueChange,
    },
  },
};
