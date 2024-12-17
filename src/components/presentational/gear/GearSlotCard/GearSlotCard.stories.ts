import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { exampleEyepiece } from "../../../__fixtures__/gear";
import { GearSlotCard } from "./GearSlotCard";

const meta: Meta<typeof GearSlotCard> = {
  component: GearSlotCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearSlotCard>;

export const WithoutGear: Story = {
  args: { type: getGearType("Eyepiece") },
};

export const WithGear: Story = {
  args: {
    type: getGearType("Eyepiece"),
    gear: exampleEyepiece,
  },
};
