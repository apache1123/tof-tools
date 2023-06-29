import type { Meta, StoryObj } from '@storybook/react';

import { GearName, GearType } from '../../models/gear-type';
import { GearTypeSelector } from './GearTypeSelector';

const meta: Meta<typeof GearTypeSelector> = {
  title: 'Gear Type Selector',
  component: GearTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearTypeSelector>;

const selectedGearType = {
  name: GearName.Helmet,
  displayName: GearName.Helmet,
} as GearType;

export const NoGearTypeSelected: Story = {};

export const SelectedGearType: Story = {
  args: {
    selectedGearType,
  },
};
