import type { Meta, StoryObj } from "@storybook/react";

import { exampleGearSet } from "../../../__fixtures__/gear-set";
import { GearSlotCardList } from "./GearSlotCardList";

const meta: Meta<typeof GearSlotCardList> = {
  component: GearSlotCardList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearSlotCardList>;

export const FromGearSet: Story = {
  args: {
    gearSlots: exampleGearSet.getSlots(),
  },
};
