import type { Meta, StoryObj } from '@storybook/react';

import { Gear } from '../../models/gear';
import { GearName, GearType } from '../../models/gear-type';
import { GearTypeSelector } from './GearTypeSelector';

const meta: Meta<typeof GearTypeSelector> = {
  title: 'Gear Type Selector',
  component: GearTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearTypeSelector>;

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

const gear = {
  type: possibleGearTypes[0],
} as Gear;

export const NoGearTypeSelected: Story = {
  args: {
    possibleGearTypes,
  },
};

export const SelectedGearType: Story = {
  args: {
    possibleGearTypes,
    gear,
  },
};
