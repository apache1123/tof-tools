import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleCombatEngine,
  exampleEyepiece,
  exampleGloves,
  exampleSpaulders,
} from "../../__fixtures__/gear";
import { GearSelector } from "./GearSelector";

const meta: Meta<typeof GearSelector> = {
  component: GearSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSelector>;

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
