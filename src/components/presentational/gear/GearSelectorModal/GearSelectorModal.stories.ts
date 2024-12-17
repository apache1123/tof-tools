import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleCombatEngine,
  exampleEyepiece,
  exampleGloves,
  exampleSpaulders,
} from "../../../__fixtures__/gear";
import { GearSelectorModal } from "./GearSelectorModal";

const meta: Meta<typeof GearSelectorModal> = {
  component: GearSelectorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSelectorModal>;

export const Default: Story = {
  args: {
    open: false,
    gears: [
      exampleEyepiece,
      exampleGloves,
      exampleCombatEngine,
      exampleSpaulders,
    ],
  },
};
