import type { Meta, StoryObj } from '@storybook/react';
import { GearIcon } from './GearIcon';
import { GearName } from '../../types';

const meta: Meta<typeof GearIcon> = {
  title: 'Gear Icon',
  component: GearIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearIcon>;

export const Helmet: Story = {
  args: {
    gearName: GearName.Helmet,
  },
};

export const Eyepiece: Story = {
  args: {
    gearName: GearName.Eyepiece,
  },
};

export const Spaulders: Story = {
  args: {
    gearName: GearName.Spaulders,
  },
};

export const Gloves: Story = {
  args: {
    gearName: GearName.Gloves,
  },
};

export const Bracers: Story = {
  args: {
    gearName: GearName.Bracers,
  },
};

export const Armor: Story = {
  args: {
    gearName: GearName.Armor,
  },
};

export const CombatEngine: Story = {
  args: {
    gearName: GearName.CombatEngine,
  },
};

export const Belt: Story = {
  args: {
    gearName: GearName.Belt,
  },
};

export const Legguards: Story = {
  args: {
    gearName: GearName.Legguards,
  },
};

export const Boots: Story = {
  args: {
    gearName: GearName.Boots,
  },
};

export const Exoskeleton: Story = {
  args: {
    gearName: GearName.Exoskeleton,
  },
};

export const Microreactor: Story = {
  args: {
    gearName: GearName.Microreactor,
  },
};
