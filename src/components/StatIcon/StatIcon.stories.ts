import type { Meta, StoryObj } from '@storybook/react';

import { StatIcon } from './StatIcon';
import { StatDefinition, StatName } from '../../types';

const meta: Meta<typeof StatIcon> = {
  title: 'Stat Icon',
  component: StatIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatIcon>;

export const Unknown: Story = {
  args: {
    statDefinition: null,
  },
};

export const Initial: Story = {
  args: {
    statDefinition: {
      name: StatName.AlteredAttack,
      iconImageName: 'altered-attack.png',
    } as StatDefinition,
  },
};
