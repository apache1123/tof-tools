import type { Meta, StoryObj } from '@storybook/react';

import { StatIcon } from './StatIcon';
import statDefinitions from '../../../data/stat-definitions';

const meta: Meta<typeof StatIcon> = {
  title: 'Stat Icon',
  component: StatIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatIcon>;

/* Stories in order of in-game gear filter order */

export const Unknown: Story = {
  args: {
    statDefinition: null,
  },
};

const statDefinition = statDefinitions.at(0);
export const Initial: Story = {
  args: {
    statDefinition,
  },
};
