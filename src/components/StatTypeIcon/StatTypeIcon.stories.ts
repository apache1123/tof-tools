import type { Meta, StoryObj } from '@storybook/react';

import { StatTypeIcon } from './StatTypeIcon';
import { StatType, StatName } from '../../types';

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
