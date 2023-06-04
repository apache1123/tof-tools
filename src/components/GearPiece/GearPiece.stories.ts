import type { Meta, StoryObj } from '@storybook/react';
import { GearPiece } from './GearPiece';
import { Gear, GearName, GearType, StatName, StatType } from '../../types';

const meta: Meta<typeof GearPiece> = {
  title: 'Gear Piece',
  component: GearPiece,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearPiece>;

const possibleGearTypes = [
  {
    name: GearName.Helmet,
  },
  {
    name: GearName.Eyepiece,
  },
  {
    name: GearName.Spaulders,
  },
] as GearType[];

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
    possibleGearTypes,
    gear: emptyStatsGear,
  },
};

export const SelectedStatType: Story = {
  args: {
    possibleGearTypes,
    gear: {
      ...emptyStatsGear,
      randomStats: [{ type: attackStatType, value: 69 }],
    },
  },
};

export const TwoRandomEmptyStats: Story = {
  args: {
    possibleGearTypes,
    gear: {
      ...emptyStatsGear,
      type: {
        ...emptyStatsGear.type,
        numberOfRandomStats: 2,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    gear: null,
  },
};
