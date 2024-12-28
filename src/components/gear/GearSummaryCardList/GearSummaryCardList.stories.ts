import type { Meta, StoryObj } from "@storybook/react";

import { exampleGearSet } from "../../__fixtures__/gear-set";
import { GearSummaryCardList } from "./GearSummaryCardList";

const meta: Meta<typeof GearSummaryCardList> = {
  component: GearSummaryCardList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSummaryCardList>;

export const FromGearSet: Story = {
  args: {
    gears: exampleGearSet.getGears(),
  },
};
