import type { Meta, StoryObj } from '@storybook/react';

import { gearTypesLookup } from '../../constants/gear-types';
import type { GearType } from '../../models/gear-type';
import { GearTypeSelector } from './GearTypeSelector';

const meta: Meta<typeof GearTypeSelector> = {
  title: 'Gear Type Selector',
  component: GearTypeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearTypeSelector>;

const selectedGearType = {
  id: 'Helmet',
  displayName: 'Helmet',
} as GearType;

const customOptions = gearTypesLookup.allIds.map((id) => ({
  gearType: gearTypesLookup.byId[id],
  isTitan: true,
}));

export const NoGearTypeSelected: Story = {};

export const SelectedGearType: Story = {
  args: {
    selectedGearType: selectedGearType,
  },
};

export const Disabled: Story = {
  args: {
    selectedGearType: selectedGearType,
    disabled: true,
  },
};

export const CustomOptions: Story = {
  args: {
    selectedGearType: selectedGearType,
    options: customOptions,
  },
};
