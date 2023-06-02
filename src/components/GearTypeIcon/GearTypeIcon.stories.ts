import type { Meta, StoryObj } from '@storybook/react';
import { GearTypeIcon } from './GearTypeIcon';
import { GearName } from '../../types';

const meta: Meta<typeof GearTypeIcon> = {
  title: 'Gear Type Icon',
  component: GearTypeIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearTypeIcon>;

export const Unknown: Story = {
  args: {
    gearName: null,
  },
};

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
