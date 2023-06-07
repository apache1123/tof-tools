import type { Meta, StoryObj } from '@storybook/react';
import { GearPiece } from './GearPiece';
import { Gear } from '../../models/gear';
import { GearName, GearType } from '../../models/gear-type';
import { StatName, StatType } from '../../models/stat-type';
import { RandomStatType } from '../../models/random-stat-type';

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
    selectedGear: emptyStatsGear,
  },
};

export const SelectedStatType: Story = {
  args: {
    possibleGearTypes,
    selectedGear: {
      ...emptyStatsGear,
      randomStats: [{ type: attackStatType as RandomStatType, value: 69 }],
    },
  },
};

export const TwoRandomEmptyStats: Story = {
  args: {
    possibleGearTypes,
    selectedGear: {
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
    selectedGear: null,
  },
};
