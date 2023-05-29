import type { Meta, StoryObj } from '@storybook/react';
import { StatSelector } from './StatSelector';
import { GearName, Stat } from '../../types';
import { gearDefinitions } from '../../../data/gear-definitions';
import statDefinitions from '../../../data/stat-definitions';

const meta: Meta<typeof StatSelector> = {
  title: 'Stat Selector',
  component: StatSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatSelector>;

const helmet = gearDefinitions.find(
  (definition) => definition.name === GearName.Helmet
);
const helmetAvailableStats = helmet.availableStatNames.map(
  (statName): Stat => ({
    definition: statDefinitions.find(
      (statDefinition) => statDefinition.name === statName
    ),
  })
);
export const V1Gear: Story = {
  args: {
    stats: helmetAvailableStats,
  },
};

const eyepiece = gearDefinitions.find(
  (definition) => definition.name === GearName.Eyepiece
);
const eyepieceAvailableStats = eyepiece.availableStatNames.map(
  (statName): Stat => ({
    definition: statDefinitions.find(
      (statDefinition) => statDefinition.name === statName
    ),
  })
);
export const V2Gear: Story = {
  args: {
    stats: eyepieceAvailableStats,
  },
};

export const Preselected: Story = {
  args: {
    stats: eyepieceAvailableStats,
    value: eyepieceAvailableStats.at(0),
  },
};
