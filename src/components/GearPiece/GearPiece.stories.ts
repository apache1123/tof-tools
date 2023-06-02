import type { Meta, StoryObj } from '@storybook/react';
import { GearPiece } from './GearPiece';
import { Gear, StatName, StatType } from '../../types';

const meta: Meta<typeof GearPiece> = {
  title: 'Gear Piece',
  component: GearPiece,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearPiece>;

const attackStatType = {
  name: StatName.Attack,
  iconImageName: 'attack.png',
} as StatType;

const emptyStatsGear = {
  type: {
    name: 'Helmet',
    numberOfRandomStats: 4,
    possibleRandomStatTypes: [
      {
        name: StatName.HP,
        iconImageName: 'hp.png',
      },
      attackStatType,
      {
        name: StatName.PhysicalResistancePercent,
        iconImageName: 'phys-res.png',
      },
    ],
  },
  randomStats: [],
} as Gear;

export const EmptyStats: Story = {
  args: {
    gear: emptyStatsGear,
  },
};

export const SelectedStatType: Story = {
  args: {
    gear: {
      ...emptyStatsGear,
      randomStats: [{ type: attackStatType, value: 69 }],
    },
  },
};
