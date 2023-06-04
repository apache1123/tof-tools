import type { Meta, StoryObj } from '@storybook/react';
import { GearTypeSelector } from './GearTypeSelector';
import { GearName, GearType } from '../../types';

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

export const NoGearTypeSelected: Story = {
  args: {
    possibleGearTypes,
  },
};

export const SelectedGearType: Story = {
  args: {
    possibleGearTypes,
    selectedGearType: possibleGearTypes[0],
  },
};
