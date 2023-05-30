import type { Meta, StoryObj } from '@storybook/react';
import { StatEditor } from './StatEditor';
import { Stat, StatName } from '../../types';

const meta: Meta<typeof StatEditor> = {
  title: 'Stat Editor',
  component: StatEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatEditor>;

const flatStat = {
  definition: { name: StatName.Attack, iconImageName: 'attack.png' },
  value: 69,
} as Stat;

const percentStat = {
  definition: {
    name: StatName.VoltAttackPercent,
    iconImageName: 'volt-attack.png',
    isPercentageBased: true,
  },
  value: 0.0692,
} as Stat;

const availableStats = [flatStat, percentStat];

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
