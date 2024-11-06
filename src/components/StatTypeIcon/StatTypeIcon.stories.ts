import type { Meta, StoryObj } from "@storybook/react";

import type { StatType } from "../../models/stat-type";
import { StatTypeIcon } from "./StatTypeIcon";

const meta: Meta<typeof StatTypeIcon> = {
  title: "Stat Type Icon",
  component: StatTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatTypeIcon>;

export const Unknown: Story = {
  args: {
    statType: undefined,
  },
};

export const Initial: Story = {
  args: {
    statType: {
      id: "Altered Attack",
      iconImageName: "altered-attack.png",
    } as StatType,
  },
};
