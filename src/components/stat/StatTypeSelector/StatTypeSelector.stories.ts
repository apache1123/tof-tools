import type { Meta, StoryObj } from "@storybook/react";

import type { StatType } from "../../../models/gear/stat-type";
import { StatTypeSelector } from "./StatTypeSelector";

const meta: Meta<typeof StatTypeSelector> = {
  component: StatTypeSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatTypeSelector>;

const statTypes = [
  { id: "HP" },
  { id: "Attack" },
  { id: "Resistance" },
] as StatType[];

export const Empty: Story = {
  args: {
    possibleStatTypes: statTypes,
  },
};

export const Preselected: Story = {
  args: {
    possibleStatTypes: statTypes,
    selectedStatType: statTypes.at(0),
  },
};
