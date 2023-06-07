import type { Meta, StoryObj } from '@storybook/react';

import { Stat } from '../../models/stat';
import { StatName, StatType } from '../../models/stat-type';
import { StatEditor } from './StatEditor';

const meta: Meta<typeof StatEditor> = {
  title: 'Stat Editor',
  component: StatEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatEditor>;

const flatStatType = {
  name: StatName.Attack,
  iconImageName: 'attack.png',
} as StatType;
const flatStat = {
  type: flatStatType,
  value: 69,
} as Stat;

const percentStatType = {
  name: StatName.VoltAttackPercent,
  iconImageName: 'volt-attack.png',
  isPercentageBased: true,
} as StatType;
const percentStat = {
  type: percentStatType,
  value: 0.0692,
} as Stat;

const availableStatTypes = [flatStatType, percentStatType];

export const FlatStat: Story = {
  args: {
    selectedStat: flatStat,
    possibleStatTypes: availableStatTypes,
  },
};

export const PercentageStat: Story = {
  args: {
    selectedStat: percentStat,
    possibleStatTypes: availableStatTypes,
  },
};

export const EmptyStatEditable: Story = {
  args: {
    selectedStat: null,
    possibleStatTypes: availableStatTypes,
  },
};
