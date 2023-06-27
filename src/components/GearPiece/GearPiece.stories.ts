import type { Meta, StoryObj } from '@storybook/react';

import { Gear } from '../../models/gear';
import { GearName, GearType } from '../../models/gear-type';
import { RandomStatType } from '../../models/random-stat-type';
import { StatName } from '../../models/stat-type';
import { GearPiece } from './GearPiece';

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
  defaultValue: 69,
  rollRange: { minValue: 101, maxValue: 1234 },
} as RandomStatType;

const emptyStatsGear = {
  type: {
    name: 'Helmet',
    numberOfRandomStats: 4,
    possibleRandomStatTypes: [
      {
        name: StatName.HP,
        iconImageName: 'hp.png',
        defaultValue: 69,
        rollRange: { minValue: 69, maxValue: 1234 },
      },
      attackStatType,
      {
        name: StatName.PhysicalResistancePercent,
        iconImageName: 'phys-res.png',
        defaultValue: 0.07,
        rollRange: { minValue: 0.05, maxValue: 0.1 },
      },
    ],
  },
  randomStats: [],
} as unknown as Gear;

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
      randomStats: [{ type: attackStatType, value: 69 }],
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
      } as GearType,
    },
  },
};

export const Empty: Story = {
  args: {
    selectedGear: undefined,
  },
};
