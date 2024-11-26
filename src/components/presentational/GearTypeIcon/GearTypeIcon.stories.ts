import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeIcon } from "./GearTypeIcon";

const meta: Meta<typeof GearTypeIcon> = {
  title: "Gear Type Icon",
  component: GearTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearTypeIcon>;

export const Unknown: Story = {
  args: {
    gearName: undefined,
  },
};

export const Helmet: Story = {
  args: {
    gearName: "Helmet",
  },
};

export const Eyepiece: Story = {
  args: {
    gearName: "Eyepiece",
  },
};

export const Spaulders: Story = {
  args: {
    gearName: "Spaulders",
  },
};

export const Gloves: Story = {
  args: {
    gearName: "Gloves",
  },
};

export const Bracers: Story = {
  args: {
    gearName: "Bracers",
  },
};

export const Armor: Story = {
  args: {
    gearName: "Armor",
  },
};

export const CombatEngine: Story = {
  args: {
    gearName: "Combat Engine",
  },
};

export const Belt: Story = {
  args: {
    gearName: "Belt",
  },
};

export const Legguards: Story = {
  args: {
    gearName: "Legguards",
  },
};

export const Boots: Story = {
  args: {
    gearName: "Boots",
  },
};

export const Exoskeleton: Story = {
  args: {
    gearName: "Exoskeleton",
  },
};

export const Microreactor: Story = {
  args: {
    gearName: "Microreactor",
  },
};
