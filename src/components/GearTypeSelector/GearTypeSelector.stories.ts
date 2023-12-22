import type { Meta, StoryObj } from '@storybook/react';

import type { GearType } from '../../models/gear-type';
import { GearTypeSelector } from './GearTypeSelector';

const meta: Meta<typeof GearTypeSelector> = {
  title: 'Gear Type Selector',
  component: GearTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearTypeSelector>;

const selectedValue = {
  gearType: {
    id: 'Helmet',
    displayName: 'Helmet',
  } as GearType,
  isTitan: true,
};

export const NoGearTypeSelected: Story = {};

export const SelectedValue: Story = {
  args: {
    selectedValue,
  },
};

export const DisableGearTypeChange: Story = {
  args: {
    selectedValue,
    disableGearTypeChange: true,
  },
};
