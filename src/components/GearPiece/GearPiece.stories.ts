import type { Meta, StoryObj } from '@storybook/react';
import { GearPiece } from './GearPiece';
import { Gear, StatName } from '../../types';

const meta: Meta<typeof GearPiece> = {
  title: 'Gear Piece',
  component: GearPiece,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearPiece>;

const emptyStatsGear = {
  type: {
    name: 'Helmet',
    possibleRandomStatTypes: [
      {
        name: StatName.HP,
        iconImageName: 'hp.png',
      },
      {
        name: StatName.Attack,
        iconImageName: 'attack.png',
      },
      {
        name: StatName.VoltAttackPercent,
        iconImageName: 'volt-image.png',
      },
    ],
  },
  stats: [],
} as Gear;

export const EmptyStats: Story = {
  args: {
    gear: emptyStatsGear,
  },
};
