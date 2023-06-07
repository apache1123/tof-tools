import type { Meta, StoryObj } from '@storybook/react';

import { StatName, StatType } from '../../models/stat-type';
import { StatTypeIcon } from './StatTypeIcon';

const meta: Meta<typeof StatTypeIcon> = {
  title: 'Stat Type Icon',
  component: StatTypeIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatTypeIcon>;

export const Unknown: Story = {
  args: {
    statType: null,
  },
};

export const Initial: Story = {
  args: {
    statType: {
      name: StatName.AlteredAttack,
      iconImageName: 'altered-attack.png',
    } as StatType,
  },
};
