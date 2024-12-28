import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleCombatEngine,
  exampleEyepiece,
  exampleGloves,
  exampleSpaulders,
} from "../../__fixtures__/gear";
import { GearList } from "./GearList";

const meta: Meta<typeof GearList> = {
  component: GearList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearList>;

export const Default: Story = {
  args: {
    gears: [
      exampleEyepiece,
      exampleGloves,
      exampleCombatEngine,
      exampleSpaulders,
    ],
  },
};
